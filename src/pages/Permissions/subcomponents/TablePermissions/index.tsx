import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import Status from "components/Status";
import { TypePermission } from "constants/types/permission.type";
import permissionStore from "pages/Permissions/store";
import { FC, useMemo } from "react";
import { formatDate } from "utils/date";

type Props = {
  onChangePage: (page: number, pageSize: number) => void;
  onClickEditPermission: (permission: TypePermission) => void;
  onConfirmDeletePermission: (id: number) => void;
};

const TablePermissson: FC<Props> = ({
  onChangePage,
  onClickEditPermission,
  onConfirmDeletePermission,
}) => {
  const permissionState = useHookstate(permissionStore);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Tên quyền",
        dataIndex: "name",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
      },
      {
        title: "Ngày tạo",
        dataIndex: "start_time",
        key: "start_time",
        render: (created_at) => (
          <>
            <span>{formatDate(created_at)}</span>
          </>
        ),
      },
      {
        title: "Thao tác",
        render: (_, permission: TypePermission) => (
          <>
            <Space direction="horizontal">
              <Button
                size="small"
                type="link"
                onClick={() => onClickEditPermission(permission)}
                icon={<EditOutlined />}
              />

              <Popconfirm
                title="Xóa nhóm quyền dùng này?"
                onConfirm={() => onConfirmDeletePermission(permission.id)}
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
        columns={columns}
        size="small"
        bordered
        dataSource={permissionState.permissions.get()}
        pagination={{
          // pageSize: permissionState.limit.get(),
          // current: permissionState.page.get(),
          // total: permissionState.total.get(),
          hideOnSinglePage: true,
          onChange: onChangePage,
        }}
        loading={permissionState.isLoadingGetAllPermission.get()}
      />
    </div>
  );
};

export default TablePermissson;
