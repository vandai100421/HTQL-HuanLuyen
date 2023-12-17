import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
  TypeCompanies,
  TypeEditCompanies,
} from "constants/types/companies.type";
import companiesStore from "pages/Companies/store";
import { FC, useMemo } from "react";

type Props = {
  onChangePage: (page: number, pageSize: number) => void;
  onClickEditCustomers: (customers: TypeEditCompanies) => void;
  onConfirmDeleteCustomers: (id: number) => void;
};

const TableCustomers: FC<Props> = ({
  onChangePage,
  onClickEditCustomers,
  onConfirmDeleteCustomers,
}) => {
  const companiesState = useHookstate(companiesStore);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Mã",
        dataIndex: "id",
      },
      {
        title: "Tên Đơn vị",
        dataIndex: "tenDonVi",
      },
      {
        title: "Loại đơn vị",
        dataIndex: "loaiDonViId",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Thao tác",
        render: (_, customers: TypeCompanies) => (
          <>
            <Space direction="horizontal">
              <Button
                size="small"
                type="link"
                onClick={() => onClickEditCustomers(customers)}
                icon={<EditOutlined />}
              />
              <Popconfirm
                title="Xóa đơn vị này?"
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
        dataSource={companiesState.companies.get()}
        pagination={{
          pageSize: companiesState.limit.get(),
          current: companiesState.page.get(),
          total: companiesState.total.get(),
          hideOnSinglePage: true,
          onChange: onChangePage,
        }}
        loading={companiesState.isLoadingGetAllCompanies.get()}
      />
    </div>
  );
};

export default TableCustomers;
