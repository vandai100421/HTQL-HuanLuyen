import React, { useCallback } from "react";
import { Avatar, Dropdown, Menu, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import authApi from "apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "pages/App/store/appSlice";
import styles from "pages/App/subcomponents/MainLayout/subcomponents/Header/style.module.css";
import mainLogo from "assets/images/logoQLNH.jpg";
import { RootState } from "configs/configureStore";
import { Navigate } from "react-router-dom";
import { LOGIN } from "routes/route.constant";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state: RootState) => state.appSlice);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      window.sessionStorage.removeItem("access_token");
    } catch (error) {
      console.log("Đăng xuất không thành công thành công. Vui lòng thử lại.");
    }
  };

  if (!isLogged) {
    return <Navigate to={LOGIN} replace />;
  }

  const menu = useCallback(
    () => (
      <Menu>
        <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    ),
    []
  );

  return (
    <header className={styles.wrapper}>
      <span className={styles.logo}>
        <span>{/* <img src={mainLogo} alt="logo" /> */}</span>
        <span style={{ fontSize: 18, fontWeight: 600, paddingLeft: 4 }}>
          Hệ thống quản lý huấn luyện
        </span>
      </span>
      <div className={styles.menu}>
        <span>
          <Dropdown overlay={menu}>
            <Avatar />
          </Dropdown>
        </span>
      </div>
    </header>
  );
};

export default Header;
