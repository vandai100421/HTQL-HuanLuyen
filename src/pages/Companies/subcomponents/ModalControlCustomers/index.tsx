import { Alert, Form, Input, Modal, Space, Switch, TreeSelect } from "antd";
import { TypeCustomers } from "constants/types/customers.type";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

const treeData = [
  {
    value: "parent 1",
    title: "parent 1",
    children: [
      {
        value: "parent 1-0",
        title: "parent 1-0",
        children: [
          {
            value: "leaf1",
            title: "leaf1",
          },
          {
            value: "leaf2",
            title: "leaf2",
          },
        ],
      },
      {
        value: "parent 1-1",
        title: "parent 1-1",
        children: [
          {
            value: "leaf3",
            title: <b style={{ color: "#08c" }}>leaf3</b>,
          },
        ],
      },
    ],
  },
];

type Props = {
  visible?: boolean;
  onCancel: () => void;
  customers?: TypeCustomers;
  onSubmit: (data: any) => void;
  error?: string;
  okText: string;
};

const schemaEditDishType = Yup.object().shape({
  name: Yup.string().required("Tên danh mục không được để trống."),
});

const ModalControlCustomers: FC<Props> = ({
  visible,
  onCancel,
  customers,
  onSubmit,
  error,
  okText,
}) => {
  const formControlCustomers = useFormik({
    initialValues: {
      id: 0,
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: schemaEditDishType,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  const [treeLine, setTreeLine] = useState(false);
  const [showLeafIcon, setShowLeafIcon] = useState(false);

  const onTreeExpand = (expandedKeys: any) => {
    console.log(expandedKeys);
  };

  useEffect(() => {
    if (visible && customers) {
      const { id, name, phone, email } = customers;
      formControlCustomers.setValues({
        id,
        name,
        phone,
        email,
      });
    }
  }, [customers, visible]);

  // reset form after close
  useEffect(() => {
    if (!visible) formControlCustomers.resetForm();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlCustomers.submitForm}
      confirmLoading={formControlCustomers.isSubmitting}
    >
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Form layout="vertical">
        <Space direction="vertical">
          <TreeSelect
            treeLine={treeLine && { showLeafIcon }}
            style={{ width: 300 }}
            treeData={treeData}
            onTreeExpand={onTreeExpand}
          />
        </Space>
        <Form.Item
          label="Tên khách hàng"
          validateStatus={
            formControlCustomers.errors.name &&
            formControlCustomers.touched.name
              ? "error"
              : ""
          }
          help={
            formControlCustomers.errors.name &&
            formControlCustomers.touched.name
              ? formControlCustomers.errors.name
              : null
          }
        >
          <Input
            name="name"
            placeholder="Nhập tên khách hàng"
            value={formControlCustomers.values.name}
            onChange={formControlCustomers.handleChange}
            onBlur={formControlCustomers.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            name="phone"
            placeholder="Nhập số điện thoại khách hàng"
            value={formControlCustomers.values.phone}
            onChange={formControlCustomers.handleChange}
            onBlur={formControlCustomers.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            placeholder="Nhập email khách hàng"
            value={formControlCustomers.values.email}
            onChange={formControlCustomers.handleChange}
            onBlur={formControlCustomers.handleBlur}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControlCustomers;
