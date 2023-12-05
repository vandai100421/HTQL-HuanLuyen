import React, { FC } from "react";
import { Alert, Form, Input, InputNumber, Modal } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  visible?: boolean;
  onCancel: () => void;
  data?: any;
  onSubmit: (data: any) => void;
  error?: string;
  okText: string;
};

const schemaControl = Yup.object().shape({
  name: Yup.string().required("Tên danh mục không được để trống."),
});

const ModalControl: FC<Props> = ({
  visible,
  onCancel,
  data,
  onSubmit,
  error,
  okText,
}) => {
  const formControlTable = useFormik({
    initialValues: {
      id: 0,
      name: "",
      num_people: 1,
      status: "",
      customers_id: 0,
    },
    validationSchema: schemaControl,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlTable.submitForm}
      confirmLoading={formControlTable.isSubmitting}
    >
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Form layout="vertical">
        <Form.Item
          label="Tên bàn"
          validateStatus={
            formControlTable.errors.name && formControlTable.touched.name
              ? "error"
              : ""
          }
          help={
            formControlTable.errors.name && formControlTable.touched.name
              ? formControlTable.errors.name
              : null
          }
        >
          <Input
            name="name"
            placeholder="VD: Bàn 1, Bàn 2 ..."
            value={formControlTable.values.name}
            onChange={formControlTable.handleChange}
            onBlur={formControlTable.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Input
            name="status"
            placeholder="0: Trống, 1: Đã đặt"
            value={formControlTable.values.status}
            onChange={formControlTable.handleChange}
            onBlur={formControlTable.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Số ghế">
          <InputNumber
            min={0}
            max={12}
            name="num_people"
            placeholder="0: Trống, 1: Đã đặt"
            value={formControlTable.values.num_people}
            onChange={(value: number) =>
              formControlTable.setFieldValue("num_people", value)
            }
            onBlur={formControlTable.handleBlur}
          />
        </Form.Item>
        {/* <Form.Item label="ID khách hàng">
          <InputNumber
            min={0}
            max={4}
            name="customers_id"
            placeholder="Không bắt buộc"
            value={formControlTable.values.customers_id}
            onChange={(value: number) =>
              formControlTable.setFieldValue("customers_id", value)
            }
            onBlur={formControlTable.handleBlur}
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ModalControl;
