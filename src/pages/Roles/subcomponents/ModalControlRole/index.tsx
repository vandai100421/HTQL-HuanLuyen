import { Alert, Form, Input, Modal } from "antd";
import { Role } from "constants/types/role.type";
import { useFormik } from "formik";
import { FC, useEffect } from "react";
import * as Yup from "yup";

type Props = {
  visible?: boolean;
  onCancel: () => void;
  role?: Role;
  onSubmit: (data: any) => void;
  error?: string;
  okText: string;
};

const schemaEditRole = Yup.object().shape({
  description: Yup.string().required("Trường mô tả không nên để trống."),
  name: Yup.string().required("Tên nhóm quyền không được để trống."),
});

const ModalControlRole: FC<Props> = ({
  visible,
  onCancel,
  role,
  onSubmit,
  error,
  okText,
}) => {
  const formControlRole = useFormik({
    initialValues: {
      id: 0,
      name: "",
      description: "",
      action: "sd",
    },
    validationSchema: schemaEditRole,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  useEffect(() => {
    if (visible && role) {
      const { id, action, description, name } = role;
      formControlRole.setValues({
        id,
        action,
        description,
        name,
      });
    }
  }, [role, visible]);

  // reset form after close
  useEffect(() => {
    if (!visible) formControlRole.resetForm();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlRole.submitForm}
      confirmLoading={formControlRole.isSubmitting}
    >
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Form layout="vertical">
        <Form.Item
          label="Tên nhóm quyền"
          validateStatus={
            formControlRole.errors.name && formControlRole.touched.name
              ? "error"
              : ""
          }
          help={
            formControlRole.errors.name && formControlRole.touched.name
              ? formControlRole.errors.name
              : null
          }
        >
          <Input
            name="name"
            placeholder="VD: Nhóm kế toán"
            value={formControlRole.values.name}
            onChange={formControlRole.handleChange}
            onBlur={formControlRole.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input.TextArea
            name="description"
            placeholder="Mô tả về nhóm quyền"
            value={formControlRole.values.description}
            onChange={formControlRole.handleChange}
            onBlur={formControlRole.handleBlur}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControlRole;
