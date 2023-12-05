import React, { useState } from "react";
import TableComponent from "pages/Equipments/subcomponents/Table";
import { Button, Card, Input, Space, message } from "antd";
import CardTitle from "components/CardTitle";
import ModalControl from "pages/Equipments/subcomponents/ModalControl";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useFormik } from "formik";

const Equipments = () => {
  // Filter

  const formFilter = useFormik({
    initialValues: {
      name: "",
      status: "all",
      start_time: null,
      end_time: null,
    },
    onSubmit: (data: any) => {
      console.log(data);
    },
  });

  // Add
  const [visibleModalAdd, setVisibleModalAdd] = useState<boolean>(false);
  const handleSubmitModalAdd = async (data: any) => {
    console.log(data);
    setVisibleModalAdd(false);
  };

  // Edit
  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false);
  const [itemSeleted, setItemSelected] = useState<any>();

  const handleSelectItem = (table: any) => {
    setItemSelected(table);
    setVisibleModalEdit(true);
  };

  const handleSubmitModalEdit = async (data: any) => {
    console.log(data);
    setVisibleModalEdit(false);
  };

  // start delete
  const handleConfirmDeleteItem = async (id: number) => {
    console.log(id);
  };
  // end delete

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
              name="name"
              value={formFilter.values.name}
              onChange={formFilter.handleChange}
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
            handleSelectItem={handleSelectItem}
            handleConfirmDeleteItem={handleConfirmDeleteItem}
          />
        </div>
      </Card>
    </>
  );
};

export default Equipments;
