import React, { FC } from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { TypeUser } from "constants/types/user.type";
import { useHookstate } from "@hookstate/core";
import userStore from "../../store";

type Props = {
  changePage: (page: number, pageSize: number) => void;
  handleSelectItem: (data: any) => void;
  handleConfirmDeleteItem: (id: number) => void;
};

const TableComponent: FC<Props> = ({
  changePage,
  handleConfirmDeleteItem,
  handleSelectItem,
}) => {
  const userState = useHookstate(userStore);

  const columns: ColumnsType<TypeUser> = [
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vai trò",
      dataIndex: "vaiTro",
      render: (value: number) => (
        <Tag color={value === 1 ? "success" : "warning"}>
          {value === 1 ? "Quản trị viên" : "Người dùng"}
        </Tag>
      ),
    },
    {
      title: "Tên đơn vị",
      dataIndex: "tenDonVi",
    },
    {
      title: "Thao tác",
      render: (_, item: TypeUser) => (
        <>
          <Space direction="horizontal">
            <Button
              size="small"
              type="link"
              onClick={() => handleSelectItem(item)}
              icon={<EditOutlined style={{ color: "orange" }} />}
            />
            <Popconfirm
              title="Xóa người dùng này?"
              onConfirm={() => handleConfirmDeleteItem(item.id)}
            >
              <Button
                size="small"
                type="link"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
            <Popconfirm
              title="Bạn muốn đổi mật khẩu?"
              onConfirm={() => console.log(item.id)}
            >
              <Button
                size="small"
                type="link"
                danger
                icon={<ExclamationOutlined style={{ color: "blue" }} />}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={userState.users.get()}
        loading={userState.isLoadingGetAllUser.get()}
        pagination={{
          pageSize: userState.limit.get(),
          current: userState.page.get(),
          total: userState.total.get(),
          hideOnSinglePage: true,
          onChange: changePage,
        }}
      />
    </>
  );
};

export default TableComponent;
