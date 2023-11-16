import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TypeCustomers } from "constants/types/customers.type";
import customersStore from "pages/Customers/store";
import { FC, useMemo } from "react";

type Props = {
  onChangePage: (page: number, pageSize: number) => void;
  onClickEditCustomers: (customers: TypeCustomers) => void;
  onConfirmDeleteCustomers: (id: number) => void;
};

const TableCustomers: FC<Props> = ({
  onChangePage,
  onClickEditCustomers,
  onConfirmDeleteCustomers,
}) => {
  const customersState = useHookstate(customersStore);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Mã khách hàng",
        dataIndex: "id",
      },
      {
        title: "Tên khách hàng",
        dataIndex: "name",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Thao tác",
        render: (_, customers: TypeCustomers) => (
          <>
            <Space direction="horizontal">
              <Button
                size="small"
                type="link"
                onClick={() => onClickEditCustomers(customers)}
                icon={<EditOutlined />}
              />
              <Popconfirm
                title="Xóa khách hàng này?"
                onConfirm={() => onConfirmDeleteCustomers(customers.id)}
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
        dataSource={customersState.customers.get()}
        pagination={{
          // pageSize: customersState.limit.get(),
          // current: customersState.page.get(),
          // total: customersState.total.get(),
          hideOnSinglePage: true,
          onChange: onChangePage,
        }}
        loading={customersState.isLoadingGetAllCustomers.get()}
      />
    </div>
  );
};

export default TableCustomers;
