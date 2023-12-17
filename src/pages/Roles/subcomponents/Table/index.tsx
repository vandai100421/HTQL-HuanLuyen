import React, { FC } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { TypeSchedule } from "constants/types/schedule.type";
import roleStore from "pages/Roles/store";

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
  const roleState = useHookstate(roleStore);

  const columns: ColumnsType<TypeSchedule> = [
    {
      title: "Tên kế hoạch",
      dataIndex: "tenKeHoach",
    },
    {
      title: "Tên đơn vị",
      dataIndex: "tenDonVi",
    },
    {
      title: "Tài liệu",
      dataIndex: "link",
      render: (value: string) => {
        return (
          <a
            href={process.env.REACT_APP_DOWNLOAD_URL + value}
            download={value.slice(8)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {value.slice(8)}
          </a>
        );
      },
    },
    {
      title: "Thao tác",
      render: (_, item: TypeSchedule) => (
        <>
          <Space direction="horizontal">
            <Button
              size="small"
              type="link"
              onClick={() => handleSelectItem(item)}
              icon={<EditOutlined style={{ color: "orange" }} />}
            />
            <Popconfirm
              title="Xóa kế hoạch huấn luyện này?"
              onConfirm={() => handleConfirmDeleteItem(item.id)}
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
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={roleState.roles.get()}
        loading={roleState.isLoading.get()}
        pagination={{
          pageSize: roleState.limit.get(),
          current: roleState.page.get(),
          total: roleState.total.get(),
          hideOnSinglePage: true,
          onChange: changePage,
        }}
      />
    </>
  );
};

export default TableComponent;
