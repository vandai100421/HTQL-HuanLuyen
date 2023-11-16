import { Alert, Form, Input, Modal } from "antd";
import { TypePermission } from "constants/types/permission.type";
import { useFormik } from "formik";
import { FC, useEffect } from "react";
import * as Yup from "yup";

type Props = {
  visible?: boolean;
  onCancel: () => void;
  permission?: TypePermission;
  onSubmit: (data: any) => void;
  error?: string;
  okText: string;
};

const schemaEditDishType = Yup.object().shape({
  name: Yup.string().required("Tên danh mục không được để trống."),
});

const ModalControlPermission: FC<Props> = ({
  visible,
  onCancel,
  permission,
  onSubmit,
  error,
  okText,
}) => {
  const formControlPermission = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: schemaEditDishType,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  useEffect(() => {
    if (visible && permission) {
      const { description, name } = permission;
      formControlPermission.setValues({
        description,
        name,
      });
    }
  }, [permission, visible]);

  // reset form after close
  useEffect(() => {
    if (!visible) formControlPermission.resetForm();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlPermission.submitForm}
      confirmLoading={formControlPermission.isSubmitting}
    >
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Form layout="vertical">
        <Form.Item
          label="Tên nhóm quyền"
          validateStatus={
            formControlPermission.errors.name &&
            formControlPermission.touched.name
              ? "error"
              : ""
          }
          help={
            formControlPermission.errors.name &&
            formControlPermission.touched.name
              ? formControlPermission.errors.name
              : null
          }
        >
          <Input
            name="name"
            placeholder="VD: Các món rau, Đồ uống mát, ..."
            value={formControlPermission.values.name}
            onChange={formControlPermission.handleChange}
            onBlur={formControlPermission.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input.TextArea
            name="description"
            placeholder="Mô tả về danh mục"
            value={formControlPermission.values.description}
            onChange={formControlPermission.handleChange}
            onBlur={formControlPermission.handleBlur}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControlPermission;
