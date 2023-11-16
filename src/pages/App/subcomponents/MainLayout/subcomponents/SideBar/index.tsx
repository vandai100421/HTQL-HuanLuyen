import {
  TeamOutlined,
  BankOutlined,
  PieChartOutlined,
  ScheduleOutlined,
  BoxPlotOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import styles from "pages/App/subcomponents/MainLayout/subcomponents/SideBar/style.module.css";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  PERMISSION,
  ROLE,
  USER,
  DEFAULT,
  COMPANIES,
  STUDENTS,
} from "routes/route.constant";

type SubMenuItem = {
  title: string;
  path: string;
};

type MenuItem = {
  title: string;
  key: string;
  icon?: ReactNode;
  submenus?: Array<SubMenuItem>;
  path?: string;
};

const menus: Array<MenuItem> = [
  {
    title: "Dashboard",
    key: "dashboard",
    path: DEFAULT,
    icon: <PieChartOutlined />,
  },
  {
    title: "Đơn vị",
    key: "company",
    icon: <BankOutlined />,
    submenus: [
      {
        title: "Danh sách đơn vị",
        path: COMPANIES,
      },
    ],
  },
  {
    title: "Cán bộ",
    key: "officer",
    icon: <TeamOutlined />,
    submenus: [
      {
        title: "Danh sách cán bộ",
        path: USER,
      },
    ],
  },
  {
    title: "Học viên",
    key: "student",
    icon: <SolutionOutlined />,
    submenus: [
      {
        title: "Danh sách học viên",
        path: STUDENTS,
      },
      {
        title: "Danh sách nhóm học viên",
        path: USER,
      },
    ],
  },
  {
    title: "Trang thiết bị",
    key: "machine",
    icon: <BoxPlotOutlined />,
    submenus: [
      {
        title: "Danh sách trang thiết bị",
        path: USER,
      },
      {
        title: "Danh sách trang thiết bị",
        path: ROLE,
      },
      {
        title: "Danh sách quyền",
        path: PERMISSION,
      },
    ],
  },
  {
    title: "Kế hoạch huấn luyện",
    key: "schedule",
    icon: <ScheduleOutlined />,
    submenus: [
      {
        title: "Danh sách người dùng",
        path: USER,
      },
      {
        title: "Danh sách nhóm",
        path: ROLE,
      },
      {
        title: "Danh sách quyền",
        path: PERMISSION,
      },
    ],
  },
];

const SideBar = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <Menu style={{ width: 220, border: "none" }} mode="inline">
          {menus.map((menu) =>
            menu.submenus ? (
              <Menu.SubMenu key={menu.key} title={menu.title} icon={menu.icon}>
                {menu.submenus &&
                  menu.submenus.map((submenu) => (
                    <Menu.Item key={submenu.path}>
                      <Link to={submenu.path}>{submenu.title}</Link>
                    </Menu.Item>
                  ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={menu.key} icon={menu.icon}>
                <Link to={menu.path || "/"}>{menu.title}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </div>
      <div style={{ width: 220 }} />
    </div>
  );
};

export default SideBar;
