import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import Status from "components/Status";
import { User } from "constants/types/user.type";
import { UsersState } from "pages/Users/hooks/useQueryUsers";
import React, { useMemo, FC } from "react";
import styles from "pages/Users/Users.module.css";

const groupName = (value: number) => {
  if (value === 0) return "Bộ phận phục vụ";
  else if (value === 1) return "Quản trị viên";
  else if (value === 2) return "Bộ phận chế biến";
  else if (value === 3) return "Bộ phận bán hàng";
};

type Props = {
  usersState: UsersState;
  onChangePage: (page: number, pageSize: number) => void;
  onClickEditUser: (user: User) => void;
  onConfirmDeleteUser: (userId: string) => void;
};

const TableUser: FC<Props> = ({
  usersState,
  onClickEditUser,
  onConfirmDeleteUser,
}) => {
  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Người dùng",
        render: (_, user: User) => (
          <>
            <Space>
              <Avatar size="large" icon={<UserOutlined />} />
              <div>
                <div>{[user.firstname, user.lastname].join(" ")}</div>
                <span className={styles.username}>{user.username}</span>
              </div>
            </Space>
          </>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
      },
      {
        title: "Thuộc nhóm",
        dataIndex: "group_id",
        render: (value) => <Tag key={value}>{groupName(value)}</Tag>,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (status, user: User) => (
          <>
            <Status
              status={user.username === "admin5" ? "deleted" : "actived"}
            />
          </>
        ),
      },
      {
        title: "Thao tác",
        render: (_, user) => (
          <>
            <Space direction="horizontal">
              <Button
                size="small"
                type="link"
                onClick={() => onClickEditUser(user)}
                icon={<EditOutlined />}
              />

              {/* <Button size="small" type="link">
                Khóa
              </Button> */}
              <Popconfirm
                title="Xóa người dùng này?"
                onConfirm={() => onConfirmDeleteUser(user.id)}
              >
                <Button
                  size="small"
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Space>
          </>
        ),
      },
    ],
    []
  );
  return (
    <div>
      <Table
        size="small"
        bordered
        columns={columns}
        dataSource={usersState.users}
        pagination={{
          pageSize: 8,
          total: usersState.total,
          hideOnSinglePage: true,
        }}
        loading={usersState.isloadingGetAllUser}
      />
    </div>
  );
};

export default TableUser;
