import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Checkbox, Form, Input, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "apis/auth";
import { TypeLogin } from "constants/types/auth.type";
import { useDispatch } from "react-redux";
import { login } from "pages/App/store/appSlice";
import { useNavigate } from "react-router-dom";
import { DEFAULT } from "routes/route.constant";
import styles from "pages/Login/Login.module.css";

const loginSchema = Yup.object().shape({
  tenNguoiDung: Yup.string().required("Tên đăng nhập không được để trống."),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // self state
  const [loginError, setLoginError] = useState<string>("");

  const initFormLoginData: TypeLogin = {
    tenNguoiDung: "",
    matKhau: "",
  };

  const formLogin = useFormik<TypeLogin>({
    initialValues: initFormLoginData,
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      try {
        const dataRes = await authApi.login(data);
        if (dataRes.data.status === "success") {
          window.sessionStorage.setItem("access_token", dataRes.data.data);
          dispatch(login());
          navigate(DEFAULT);
        } else {
          message.error("Tên người dùng hoặc mật khẩu không chính xác.");
        }
      } catch (error: any) {
        message.error("Lỗi đăng nhập!");
      }
    },
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.logo}>
          {/* <img src={mainLogo} alt="logo" /> */}
        </span>
        {/* <span className={styles.title}>Shop Music</span> */}
      </div>
      <div className={styles.description}>
        <span>Hệ thống quản lý huấn luyện</span>
      </div>
      <div className={styles.form}>
        <Card>
          {loginError && (
            <Alert message={loginError} type="error" className={styles.error} />
          )}
          <Form onFinish={formLogin.handleSubmit}>
            <Form.Item
              validateStatus={
                formLogin.errors.tenNguoiDung && formLogin.touched.tenNguoiDung
                  ? "error"
                  : ""
              }
              help={
                formLogin.touched.tenNguoiDung && formLogin.errors.tenNguoiDung
              }
            >
              <Input
                placeholder="Email/Số điện thoại/Tên đăng nhập"
                name="tenNguoiDung"
                value={formLogin.values.tenNguoiDung}
                onChange={formLogin.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Mật khẩu"
                type="password"
                name="matKhau"
                value={formLogin.values.matKhau}
                onChange={formLogin.handleChange}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Button block type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form>
        </Card>
      </div>
      <div className={styles.copyright}>
        <span>© 2023 Developed by Brothers</span>
      </div>
    </section>
  );
};

export default Login;
