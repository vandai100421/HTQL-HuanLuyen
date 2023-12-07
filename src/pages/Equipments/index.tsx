import React, { useEffect, useState } from "react";
import TableComponent from "pages/Equipments/subcomponents/Table";
import { Button, Card, Input, Space, message } from "antd";
import CardTitle from "components/CardTitle";
import ModalControl from "pages/Equipments/subcomponents/ModalControl";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { getAllEquipment } from "./store";
import { CommonGetAllParams } from "constants/types/common.type";
import { fetchCompaniesTree } from "pages/Companies/store";
import { equipmentAPI } from "apis/equipment";
import {
  TypeEditEquipment,
  TypeEquipment,
} from "constants/types/equipment.type";

const Equipments = () => {
  // Filter
  useEffect(() => {
    getAllEquipment();
    fetchCompaniesTree();
  }, []);

  const formFilter = useFormik<CommonGetAllParams>({
    initialValues: {
      q: "",
      page: 1,
      limit: 10,
    },
    onSubmit: (data: CommonGetAllParams) => {
      getAllEquipment(data);
    },
  });

  // Add
  const [visibleModalAdd, setVisibleModalAdd] = useState<boolean>(false);
  const handleSubmitModalAdd = async (data: TypeEditEquipment) => {
    try {
      await equipmentAPI.create(data);
      console.log(data);
      setVisibleModalAdd(false);
      getAllEquipment();
      message.success("Thêm mới dữ liệu thành công");
    } catch (error) {
      setVisibleModalAdd(false);
      message.error("Thêm mới dữ liệu thất bại");
    }
  };

  // Edit
  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false);
  const [itemSeleted, setItemSelected] = useState<TypeEquipment>();

  const handleSelectItem = (data: TypeEquipment) => {
    setItemSelected(data);
    setVisibleModalEdit(true);
  };

  const handleSubmitModalEdit = async (data: TypeEditEquipment) => {
    try {
      await equipmentAPI.update(data);
      console.log(data);
      setVisibleModalEdit(false);
      getAllEquipment();
      message.success("Cập nhật dữ liệu thành công");
    } catch (error) {
      setVisibleModalEdit(false);
      message.error("Cập nhật dữ liệu thất bại");
    }
  };

  // start delete
  const handleConfirmDeleteItem = async (id: number) => {
    try {
      await equipmentAPI.delete(id);
      getAllEquipment();
      message.success("Xóa dữ liệu thành công");
    } catch (error) {
      setVisibleModalEdit(false);
      message.error("Xóa dữ liệu thất bại");
    }
  };
  // end delete

  const handleChangePage = (page: number, pageSize: number) => {
    getAllEquipment({
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
          title="Trang Thiết Bị"
          subtitle="Thông tin về trang thiết bị"
        />

        <div>
          <Space>
            <Input
              placeholder="Tìm kiếm theo tên"
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

export default Equipments;
