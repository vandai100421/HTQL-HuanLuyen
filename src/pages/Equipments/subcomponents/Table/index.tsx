import React, { FC } from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TypeEquipment } from "constants/types/equipment.type";
import { getTinhTrang } from "pages/Common/store";
import { useHookstate } from "@hookstate/core";
import equipmentStore from "pages/Equipments/store";

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
  const equipmentState = useHookstate(equipmentStore);

  const columns: ColumnsType<TypeEquipment> = [
    {
      title: "Tên trang thiết bị",
      dataIndex: "tenTTB",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhTrang",
      render: (value: number) => (
        <Tag color={value === 1 ? "success" : "warning"}>
          {getTinhTrang(value)}{" "}
        </Tag>
      ),
    },
    {
      title: "Địa điểm",
      dataIndex: "diaDiem",
      key: "address",
    },
    {
      title: "Tên đơn vị",
      dataIndex: "tenDonVi",
    },
    {
      title: "Thao tác",
      render: (_, item: TypeEquipment) => (
        <>
          <Space direction="horizontal">
            <Button
              size="small"
              type="link"
              onClick={() => handleSelectItem(item)}
              icon={<EditOutlined style={{ color: "orange" }} />}
            />
            <Popconfirm
              title="Xóa trang thiết bị này?"
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
        dataSource={equipmentState.equipments.get()}
        loading={equipmentState.isLoadingGetAllEquipment.get()}
        pagination={{
          pageSize: equipmentState.limit.get(),
          current: equipmentState.page.get(),
          total: equipmentState.total.get(),
          hideOnSinglePage: true,
          onChange: changePage,
        }}
      />
    </>
  );
};

export default TableComponent;