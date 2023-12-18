import React, { FC } from "react";
import { Button, Popconfirm, Row, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TypeEquipment } from "constants/types/equipment.type";
import { getTinhTrang } from "pages/Common/store";
import { useHookstate } from "@hookstate/core";
import equipmentStore from "pages/Equipments/store";
import { utils, writeFile } from "xlsx";

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
    // {
    //   title: "Tên đơn vị",
    //   dataIndex: "tenDonVi",
    // },
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

  const handleExportFile = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(equipmentState.equipments.get());
    utils.book_append_sheet(wb, ws, "Equipments");
    writeFile(wb, "Danh Sach Trang thiết bị.xlsx");
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={
          Number(window.sessionStorage.getItem("vaiTro")) === 1
            ? equipmentState.value.equipments
            : equipmentState.value.equipments.filter(
                (item) =>
                  item.donViId ===
                  Number(window.sessionStorage.getItem("donViId"))
              )
        }
        loading={equipmentState.isLoadingGetAllEquipment.get()}
        pagination={{
          pageSize: equipmentState.limit.get(),
          current: equipmentState.page.get(),
          total: equipmentState.total.get(),
          hideOnSinglePage: true,
          onChange: changePage,
        }}
      />
      {equipmentState.total.get() > 0 && (
        <Row justify="end" style={{ padding: "10px 0 0 0" }}>
          <Button type="primary" onClick={handleExportFile}>
            Export File
          </Button>
        </Row>
      )}
    </>
  );
};

export default TableComponent;
