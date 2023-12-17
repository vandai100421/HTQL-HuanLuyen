import React, { FC, useEffect } from "react";
import { Col, Form, Input, Modal, Row, Select, TreeSelect } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TypeEditUser } from "constants/types/user.type";
import { useHookstate } from "@hookstate/core";
import companiesStore from "pages/Companies/store";
const { Option } = Select;

type Props = {
  visible?: boolean;
  onCancel: () => void;
  data?: any;
  onSubmit: (data: any) => void;
  okText: string;
};

const schemaControl = Yup.object().shape({
  hoTen: Yup.string().required("Họ và tên không được để trống."),
  tenNguoiDung: Yup.string().required("Tên đăng nhập không được để trống."),
  email: Yup.string().required("Email không được để trống."),
  // matKhau: Yup.string()
  //   .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
  //   .required("Mật khẩu không được để trống."),
  // confirmMatKhau: Yup.string().test(
  //   "confirmPassword",
  //   "Mật khẩu nhập lại không khớp",
  //   (value, ctx) => {
  //     if (ctx.parent.matKhau && ctx.parent.matKhau === value) return true;
  //     return false;
  //   }
  // ),
});

const ModalControl: FC<Props> = ({
  visible,
  onCancel,
  data,
  onSubmit,
  okText,
}) => {
  const companiesState = useHookstate(companiesStore);
  const formControlData = useFormik<TypeEditUser>({
    initialValues: {
      id: 0,
      email: "",
      hoTen: "",
      matKhau: "",
      confirmMatKhau: "",
      tenNguoiDung: "",
      vaiTro: 2,
      donViId: 1,
    },
    validationSchema: schemaControl,
    onSubmit: (data) => {
      onSubmit(data);
      formControlData.resetForm();
    },
  });

  const changeCompany = (newValue: string) => {
    formControlData.setFieldValue("donViId", newValue);
  };

  const changeVaiTro = (value: number) => {
    formControlData.setFieldValue("vaiTro", value);
  };

  useEffect(() => {
    if (data) {
      const {
        id,
        email,
        hoTen,
        matKhau,
        tenNguoiDung,
        vaiTro,
        donViId,
        confirmMatKhau,
      } = data;

      formControlData.setValues({
        id,
        email,
        hoTen,
        matKhau,
        tenNguoiDung,
        vaiTro,
        donViId,
        confirmMatKhau: "",
      });
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlData.submitForm}
    >
      <Form layout="vertical">
        <Form.Item
          label="Họ và tên"
          validateStatus={
            formControlData.errors.hoTen && formControlData.touched.hoTen
              ? "error"
              : ""
          }
          help={
            formControlData.errors.hoTen && formControlData.touched.hoTen
              ? formControlData.errors.hoTen
              : null
          }
        >
          <Input
            name="hoTen"
            placeholder="Nhập họ và tên người dùng"
            value={formControlData.values.hoTen}
            onChange={formControlData.handleChange}
            onBlur={formControlData.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={
            formControlData.errors.email && formControlData.touched.email
              ? "error"
              : ""
          }
          help={
            formControlData.errors.email && formControlData.touched.email
              ? formControlData.errors.email
              : null
          }
        >
          <Input
            name="email"
            placeholder="Nhập email"
            value={formControlData.values.email}
            onChange={formControlData.handleChange}
            onBlur={formControlData.handleBlur}
          />
        </Form.Item>

        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item name="vaiTro" label="Vai trò của người dùng">
              <Select
                placeholder="Chọn vai trò của người dùng"
                defaultValue={formControlData.values.vaiTro}
                value={formControlData.values.vaiTro}
                onChange={changeVaiTro}
                allowClear
              >
                <Option value={1} key={1}>
                  Quản trị viên
                </Option>
                <Option value={2} key={2}>
                  Người dùng
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Đơn vị">
          <TreeSelect
            style={{ width: "100%" }}
            value={
              formControlData.values.donViId
                ? formControlData.values.donViId.toString()
                : "1"
            }
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={companiesState.companiesTree.get()}
            placeholder="Chọn đơn vị"
            treeDefaultExpandAll
            onChange={changeCompany}
          />
        </Form.Item>

        <Form.Item
          label="Tên đăng nhập"
          validateStatus={
            formControlData.errors.tenNguoiDung &&
            formControlData.touched.tenNguoiDung
              ? "error"
              : ""
          }
          help={
            formControlData.errors.tenNguoiDung &&
            formControlData.touched.tenNguoiDung
              ? formControlData.errors.tenNguoiDung
              : null
          }
        >
          <Input
            name="tenNguoiDung"
            placeholder="Nhập tên đăng nhập"
            value={formControlData.values.tenNguoiDung}
            onChange={formControlData.handleChange}
            onBlur={formControlData.handleBlur}
          />
        </Form.Item>

        {!data && (
          <>
            <Form.Item
              label="Mật khẩu"
              validateStatus={
                formControlData.errors.matKhau &&
                formControlData.touched.matKhau
                  ? "error"
                  : ""
              }
              help={
                formControlData.errors.matKhau &&
                formControlData.touched.matKhau
                  ? formControlData.errors.matKhau
                  : null
              }
            >
              <Input
                type="password"
                name="matKhau"
                placeholder="Nhập mật khẩu"
                value={formControlData.values.matKhau}
                onChange={formControlData.handleChange}
                onBlur={formControlData.handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              validateStatus={
                formControlData.errors.confirmMatKhau &&
                formControlData.touched.confirmMatKhau
                  ? "error"
                  : ""
              }
              help={
                formControlData.errors.confirmMatKhau &&
                formControlData.touched.confirmMatKhau
                  ? formControlData.errors.confirmMatKhau
                  : null
              }
            >
              <Input
                type="password"
                name="confirmMatKhau"
                placeholder="Nhập lại mật khẩu"
                value={formControlData.values.confirmMatKhau}
                onChange={formControlData.handleChange}
                onBlur={formControlData.handleBlur}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalControl;
