import { CopyOutlined } from "@ant-design/icons";
import { Alert, Checkbox, Form, Input, message, Modal, Select } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { User } from "constants/types/user.type";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { generatePassword } from "utils/generatePassword";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidUserName,
} from "utils/validate";
import * as Yup from "yup";

// type FormControlValue = {
//   first_name: string;
//   last_name: string;
//   username: string;
//   password?: string;
//   email: string;
//   phone: string;
//   roles: Array<string>;
// };

type Props = {
  visible?: boolean;
  onCancel: () => void;
  user?: User;
  onSubmit: (data: any) => void;
  okText: string;
  error?: string;
  hidePassword?: boolean;
};

const ModalControlUser: FC<Props> = ({
  visible,
  onCancel,
  user,
  onSubmit,
  okText,
  error,
  hidePassword,
}) => {
  const initialValues: User = {
    id: 0,
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    group_id: 0,
    password: "",
    position: "",
    salary: 0,
    status: "actived",
  };

  const schema: any = {};

  if (!hidePassword) {
    schema.password = Yup.string().test(
      "validatePassword",
      "Mật khẩu không hợp lệ.",
      (password) => {
        if (password) {
          return isValidPassword(password);
        }
        return false;
      }
    );
    initialValues.password = "";
  }

  const formControlUserSchema = Yup.object().shape({
    firstname: Yup.string().required("Họ người dùng không được để trống."),
    lastname: Yup.string().required("Tên người dùng không được để trống."),
    username: Yup.string()
      .required("Tên đăng nhập không được để trống.")
      .test("validateUsername", "Tên đăng nhập không hợp lệ.", (username) => {
        if (username) {
          return isValidUserName(username);
        }
        return false;
      }),
    email: Yup.string().test(
      "validateEmail",
      "Địa chỉ email không hợp lệ.",
      (email) => {
        if (email) {
          return isValidEmail(email);
        }
        return false;
      }
    ),
    phone: Yup.string().test(
      "validatePhoneNumber",
      "Số điện thoại không hợp lệ.",
      (phone) => {
        if (phone) {
          return isValidPhoneNumber(phone);
        }
        return false;
      }
    ),
    group_id: Yup.string().required("Nhóm người dùng không được để trống."),
    ...schema,
  });

  const formControlUser = useFormik({
    initialValues,
    validationSchema: formControlUserSchema,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  useEffect(() => {
    formControlUser.resetForm();
    setIsRandomPassword(false);
  }, [error]);

  useEffect(() => {
    if (visible && user) {
      const {
        firstname,
        lastname,
        username,
        email,
        phone,
        group_id,
        id,
        password,
        position,
        salary,
        status,
      } = user;
      formControlUser.setValues({
        username,
        email,
        phone,
        firstname,
        lastname,
        password,
        group_id,
        id,
        position,
        salary,
        status,
      });
    }
  }, [user, visible]);

  // handle random password
  const [isRandomPassword, setIsRandomPassword] = useState<boolean>(false);

  const handleRandomPassword = (evt: CheckboxChangeEvent) => {
    const { checked } = evt.target;
    setIsRandomPassword(checked);
    if (checked) {
      const randomPassword = generatePassword();
      formControlUser.setFieldValue("password", randomPassword);
    } else {
      formControlUser.setFieldValue("password", "");
    }
  };

  const handleCopyPasswordToClipboard = () => {
    navigator.clipboard.writeText(formControlUser.values.password);
    message.success("Đã sao chép mật khẩu.");
  };

  // reset form after close
  useEffect(() => {
    if (!visible) {
      formControlUser.resetForm();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlUser.submitForm}
      confirmLoading={formControlUser.isSubmitting}
    >
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Form layout="vertical">
        <Form.Item label="Tên người dùng" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 4px)",
              marginRight: "4px",
            }}
            validateStatus={
              formControlUser.errors.firstname &&
              formControlUser.touched.firstname
                ? "error"
                : ""
            }
            help={
              formControlUser.errors.firstname &&
              formControlUser.touched.firstname
                ? formControlUser.errors.firstname
                : null
            }
          >
            <Input
              placeholder="Họ"
              name="firstname"
              value={formControlUser.values.firstname}
              onChange={formControlUser.handleChange}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 4px)",
              marginLeft: "4px",
            }}
            validateStatus={
              formControlUser.errors.lastname &&
              formControlUser.touched.lastname
                ? "error"
                : ""
            }
            help={
              formControlUser.errors.lastname &&
              formControlUser.touched.lastname
                ? formControlUser.errors.lastname
                : null
            }
          >
            <Input
              placeholder="Tên"
              name="lastname"
              value={formControlUser.values.lastname}
              onChange={formControlUser.handleChange}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Tên đăng nhập"
          validateStatus={
            formControlUser.errors.username && formControlUser.touched.username
              ? "error"
              : ""
          }
          help={
            formControlUser.errors.username && formControlUser.touched.username
              ? formControlUser.errors.username
              : null
          }
        >
          <Input
            type="username"
            placeholder="Nhập vào"
            name="username"
            value={formControlUser.values.username}
            onChange={formControlUser.handleChange}
          />
        </Form.Item>
        {!hidePassword && (
          <Form.Item label="Mật khẩu" style={{ marginBottom: 0 }}>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 4px)",
                marginRight: "4px",
              }}
              validateStatus={
                formControlUser.errors.password &&
                formControlUser.touched.password
                  ? "error"
                  : ""
              }
              help={
                formControlUser.errors.password &&
                formControlUser.touched.password
                  ? formControlUser.errors.password
                  : null
              }
            >
              <Input
                placeholder="Nhập vào"
                type="password"
                name="password"
                value={formControlUser.values.password}
                onChange={formControlUser.handleChange}
                addonAfter={
                  <CopyOutlined
                    style={{ cursor: "pointer" }}
                    onClick={handleCopyPasswordToClipboard}
                  />
                }
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 4px)",
                marginLeft: "4px",
              }}
            >
              <Checkbox
                checked={isRandomPassword}
                onChange={handleRandomPassword}
              >
                Mật khẩu ngẫu nhiên
              </Checkbox>
            </Form.Item>
          </Form.Item>
        )}
        <Form.Item
          label="Địa chỉ email"
          validateStatus={
            formControlUser.errors.email && formControlUser.touched.email
              ? "error"
              : ""
          }
          help={
            formControlUser.errors.email && formControlUser.touched.email
              ? formControlUser.errors.email
              : null
          }
        >
          <Input
            type="email"
            placeholder="VD: example@gmail.com"
            name="email"
            value={formControlUser.values.email}
            onChange={formControlUser.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          validateStatus={
            formControlUser.errors.phone && formControlUser.touched.phone
              ? "error"
              : ""
          }
          help={
            formControlUser.errors.phone && formControlUser.touched.phone
              ? formControlUser.errors.phone
              : null
          }
        >
          <Input
            placeholder="VD: 0334455667"
            name="phone"
            value={formControlUser.values.phone}
            onChange={formControlUser.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Nhóm người dùng"
          validateStatus={
            formControlUser.errors.group_id && formControlUser.touched.group_id
              ? "error"
              : ""
          }
          help={
            formControlUser.errors.group_id && formControlUser.touched.group_id
              ? formControlUser.errors.group_id
              : null
          }
        >
          <Select
            defaultValue={1}
            style={{ width: 120 }}
            onChange={(value) =>
              formControlUser.setFieldValue("group_id", value)
            }
            value={formControlUser.values.group_id}
            options={[
              { value: 1, label: "Quản trị viên" },
              { value: 0, label: "Bộ phận phục vụ" },
              { value: 2, label: "Bộ phận chế biến" },
              { value: 3, label: "Bộ phận bán hàng" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControlUser;
