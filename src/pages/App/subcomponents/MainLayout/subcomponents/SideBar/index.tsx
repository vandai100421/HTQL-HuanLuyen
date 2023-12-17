import {
  TeamOutlined,
  BankOutlined,
  PieChartOutlined,
  ScheduleOutlined,
  BoxPlotOutlined,
  SolutionOutlined,
  EyeOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import styles from "pages/App/subcomponents/MainLayout/subcomponents/SideBar/style.module.css";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  USER,
  DEFAULT,
  COMPANIES,
  STUDENTS,
  EQUIPMENTS,
  ROLE,
  PERMISSION,
  FOLLOWPLANS,
  STATISTIC_BY_COMPANY,
  STATISTIC_BY_DILIGENCE,
  SCHEDULESUPPER,
  SCHEDULESYOURSELF,
  SCHEDULESLOWER,
  RESULT_PLAN,
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

let menus: Array<MenuItem> = [
  {
    title: "Dashboard",
    key: "dashboard",
    path: DEFAULT,
    icon: <PieChartOutlined />,
  },
  {
    title: "Quản lý Người dùng",
    key: "user",
    icon: <TeamOutlined />,
    submenus: [
      {
        title: "Danh sách người dùng",
        path: USER,
      },
      // {
      //   title: "Danh sách nhóm",
      //   path: ROLE,
      // },
      // {
      //   title: "Danh sách quyền",
      //   path: PERMISSION,
      // },
    ],
  },
  {
    title: "Quản lý Đơn vị",
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
    title: "Học viên",
    key: "student",
    icon: <SolutionOutlined />,
    submenus: [
      {
        title: "Danh sách học viên",
        path: STUDENTS,
      },
      // {
      //   title: "Kết quả rèn luyện",
      //   path: USER,
      // },
    ],
  },
  {
    title: "Trang thiết bị",
    key: "equipment",
    icon: <BoxPlotOutlined />,
    submenus: [
      {
        title: "Danh sách trang thiết bị",
        path: EQUIPMENTS,
      },
    ],
  },
  {
    title: "Kế hoạch huấn luyện",
    key: "schedule",
    icon: <ScheduleOutlined />,
    submenus: [
      {
        title: "Cấp trên",
        path: SCHEDULESUPPER,
      },
      {
        title: "Cấp mình",
        path: SCHEDULESYOURSELF,
      },
      {
        title: "Cấp dưới",
        path: SCHEDULESLOWER,
      },
    ],
  },
  {
    title: "Quản lý thực hiện kế hoạch",
    key: "followplan",
    icon: <EyeOutlined />,
    submenus: [
      {
        title: "Điểm danh",
        path: FOLLOWPLANS,
      },
      {
        title: "Kết quả thực hiện",
        path: RESULT_PLAN,
      },
    ],
  },
  {
    title: "Thống kê",
    key: "statistic",
    icon: <BarChartOutlined />,
    submenus: [
      {
        title: "Theo chuyên cần",
        path: STATISTIC_BY_DILIGENCE,
      },
      {
        title: "Theo đơn vị",
        path: STATISTIC_BY_COMPANY,
      },
    ],
  },
];

if (Number(window.sessionStorage.getItem("vaiTro")) === 2) {
  menus = menus.filter((item) => item.key !== "user");
}
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
