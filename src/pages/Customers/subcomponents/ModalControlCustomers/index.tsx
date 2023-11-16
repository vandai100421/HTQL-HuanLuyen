import { Alert, Form, Input, Modal } from "antd";
import { TypeCustomers } from "constants/types/customers.type";
import { useFormik } from "formik";
import { FC, useEffect } from "react";
import * as Yup from "yup";

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
        {/* <Form.Item label="ID khách hàng">
          <InputNumber
            min={0}
            max={4}
            name="customers_id"
            placeholder="Không bắt buộc"
            value={formControlCustomers.values.customers_id}
            onChange={(value: number) =>
              formControlCustomers.setFieldValue("customers_id", value)
            }
            onBlur={formControlCustomers.handleBlur}
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ModalControlCustomers;
