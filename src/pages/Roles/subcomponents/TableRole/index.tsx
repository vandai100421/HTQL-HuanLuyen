import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import Status from "components/Status";
import { Role } from "constants/types/role.type";
import rolesStore from "pages/Roles/store";
import { FC, useMemo } from "react";
import { formatDate } from "utils/date";

type Props = {
  onChangePage: (page: number, pageSize: number) => void;
  onClickEditRole: (role: Role) => void;
  onConfirmDeleteRole: (roleId: number) => void;
};

const TableRole: FC<Props> = ({
  onChangePage,
  onClickEditRole,
  onConfirmDeleteRole,
}) => {
  const rolesState = useHookstate(rolesStore);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Mã nhóm",
        dataIndex: "id",
      },
      {
        title: "Tên nhóm",
        dataIndex: "name",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (status) => (
          <>
            {/* {status} */}
            <Status status={status} />
          </>
        ),
      },
      {
        title: "Ngày tạo",
        dataIndex: "create_at",
        key: "create_at",
        render: (created_at) => (
          <>
            <span>{formatDate(created_at)}</span>
          </>
        ),
      },
      {
        title: "Thao tác",
        render: (_, role: Role) => (
          <>
            <Space direction="horizontal">
              {role.code !== "admin" && (
                <Button
                  size="small"
                  type="link"
                  onClick={() => onClickEditRole(role)}
                  icon={<EditOutlined />}
                />
              )}
              {!["admin", "customer"].includes(role.code) && (
                <Popconfirm
                  title="Xóa nhóm quyền dùng này?"
                  onConfirm={() => onConfirmDeleteRole(role.id)}
                >
                  <Button
                    size="small"
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              )}
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
        columns={columns}
        size="small"
        bordered
        dataSource={rolesState.roles.get()}
        pagination={{
          // pageSize: rolesState.limit.get(),
          // current: rolesState.page.get(),
          // total: rolesState.total.get(),
          hideOnSinglePage: true,
          onChange: onChangePage,
        }}
        loading={rolesState.isLoadingGetAllRole.get()}
      />
    </div>
  );
};

export default TableRole;
