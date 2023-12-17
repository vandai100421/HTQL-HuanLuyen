import React, { useEffect, useState } from "react";
import TableComponent from "pages/Schedules/subcomponents/Table";
import { Button, Card, Input, Space, message } from "antd";
import CardTitle from "components/CardTitle";
import ModalControl from "pages/Schedules/subcomponents/ModalControl";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { getAllPermission } from "./store";
import { scheduleApi } from "apis/schedule";
import { TypeEditSchedule, TypeSchedule } from "constants/types/schedule.type";
import { CommonGetAllParams } from "constants/types/common.type";
import { fetchCompaniesTree } from "pages/Companies/store";

const Permission = () => {
  // Filter
  useEffect(() => {
    getAllPermission();
    fetchCompaniesTree();
  }, []);

  const formFilter = useFormik<CommonGetAllParams>({
    initialValues: {
      q: "",
      page: 1,
      limit: 10,
    },
    onSubmit: (data: CommonGetAllParams) => {
      getAllPermission(data);
    },
  });

  // Add
  const [visibleModalAdd, setVisibleModalAdd] = useState<boolean>(false);
  const handleSubmitModalAdd = async (data: TypeEditSchedule) => {
    try {
      await scheduleApi.create(data);
      setVisibleModalAdd(false);
      getAllPermission();
      message.success("Thêm mới dữ liệu thành công");
    } catch (error) {
      setVisibleModalAdd(false);
      message.error("Thêm mới dữ liệu thất bại");
    }
  };

  // Edit
  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false);
  const [itemSeleted, setItemSelected] = useState<TypeSchedule>();

  const handleSelectItem = (data: TypeSchedule) => {
    setItemSelected(data);
    setVisibleModalEdit(true);
  };

  const handleSubmitModalEdit = async (data: TypeEditSchedule) => {
    try {
      await scheduleApi.update(data);
      console.log(data);
      setVisibleModalEdit(false);
      getAllPermission();
      message.success("Cập nhật dữ liệu thành công");
    } catch (error) {
      setVisibleModalEdit(false);
      message.error("Cập nhật dữ liệu thất bại");
    }
  };

  // start delete
  const handleConfirmDeleteItem = async (id: number) => {
    try {
      await scheduleApi.delete(id);
      getAllPermission();
      message.success("Xóa dữ liệu thành công");
    } catch (error) {
      setVisibleModalEdit(false);
      message.error("Xóa dữ liệu thất bại");
    }
  };
  // end delete

  const handleChangePage = (page: number, pageSize: number) => {
    getAllPermission({
      page: page,
      limit: pageSize,
    });
  };

  return (
    <>
      <ModalControl
        visible={visibleModalAdd}
        onCancel={() => setVisibleModalAdd(false)}
        onSubmit={handleSubmitModalAdd}
        okText="Thêm"
      />
      <ModalControl
        visible={visibleModalEdit}
        onCancel={() => setVisibleModalEdit(false)}
        onSubmit={handleSubmitModalEdit}
        data={itemSeleted}
        okText="Sửa"
      />
      <Card>
        <CardTitle
          title="Danh sách quyền"
          subtitle="Thông tin về quyền của người dùng"
        />

        <div>
          <Space>
            <Input
              placeholder="Tìm kiếm theo tên quyền"
              suffix={<SearchOutlined />}
              name="q"
              value={formFilter.values.q}
              onChange={formFilter.handleChange}
              onPressEnter={formFilter.submitForm}
              allowClear
            />
            <Button type="primary" onClick={formFilter.submitForm}>
              Tìm kiếm
            </Button>
          </Space>
        </div>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setVisibleModalAdd(true)}
          style={{ marginBottom: 16, float: "right" }}
        >
          Tạo mới
        </Button>

        <div>
          <TableComponent
            changePage={handleChangePage}
            handleSelectItem={handleSelectItem}
            handleConfirmDeleteItem={handleConfirmDeleteItem}
          />
        </div>
      </Card>
    </>
  );
};

export default Permission;
