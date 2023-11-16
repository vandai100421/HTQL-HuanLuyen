import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TypeTable } from "constants/types/table.type";
import tableStore from "pages/Table/store";
import { FC, useMemo } from "react";

type Props = {
  onChangePage: (page: number, pageSize: number) => void;
  onClickEditTable: (table: TypeTable) => void;
  onConfirmDeleteTable: (id: number) => void;
};

const TableTable: FC<Props> = ({
  onChangePage,
  onClickEditTable,
  onConfirmDeleteTable,
}) => {
  const tableState = useHookstate(tableStore);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Mã bàn",
        dataIndex: "id",
      },
      {
        title: "Tên bàn",
        dataIndex: "name",
      },
      {
        title: "Số ghế",
        dataIndex: "num_people",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (status: any) => (
          <Tag color={status === "1" ? "warning" : "default"}>
            {status === "1" ? "Đã đặt" : "Còn trống"}
          </Tag>
        ),
      },
      {
        title: "ID người dùng",
        dataIndex: "customers_id",
        // render: (status) => (
        //   <>
        //     <Status status={status} />
        //   </>
        // ),
      },
      {
        title: "Thao tác",
        render: (_, table: TypeTable) => (
          <>
            <Space direction="horizontal">
              <Button
                size="small"
                type="link"
                onClick={() => onClickEditTable(table)}
                icon={<EditOutlined />}
              />
              <Popconfirm
                title="Xóa bàn này?"
                onConfirm={() => onConfirmDeleteTable(table.id)}
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
        dataSource={tableState.tables.get()}
        pagination={{
          // pageSize: tableState.limit.get(),
          // current: tableState.page.get(),
          // total: tableState.total.get(),
          hideOnSinglePage: true,
          onChange: onChangePage,
        }}
        loading={tableState.isLoadingGetAllTable.get()}
      />
    </div>
  );
};

export default TableTable;
