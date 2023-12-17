import React, { FC } from "react";
import { Button, Popconfirm, Row, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import scheduleStore from "pages/Schedules/store";
import { TypeSchedule } from "constants/types/schedule.type";
import { utils, writeFile } from "xlsx";
import moment from "moment";

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
  const scheduleState = useHookstate(scheduleStore);

  const columns: ColumnsType<TypeSchedule> = [
    {
      title: "Mã kế hoạch",
      dataIndex: "maKeHoach",
    },
    {
      title: "Tên kế hoạch",
      dataIndex: "tenKeHoach",
    },
    {
      title: "Nội dung",
      dataIndex: "noiDung",
      render: (value: string, record: any) => {
        return (
          <>
            {value} <>{record.link ? <LinkOutlined /> : null}</>
          </>
        );
      },
    },
    {
      title: "Bắt đầu",
      dataIndex: "thoiGianBatDau",
      render: (value: string) => (
        <Tag color="success">{moment(value).format("DD/MM/YYYY")}</Tag>
      ),
    },
    {
      title: "Kết thúc",
      dataIndex: "thoiGianKetThuc",

      render: (value: string) => (
        <Tag color="success">{moment(value).format("DD/MM/YYYY")}</Tag>
      ),
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

  const handleExportFile = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(scheduleState.schedulesLower.get());
    utils.book_append_sheet(wb, ws, "Schedules");
    writeFile(wb, "Danh Sach Kế hoạch.xlsx");
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={scheduleState.schedulesLower.get()}
        loading={scheduleState.isLoadingGetAllSchedule.get()}
        pagination={{
          pageSize: scheduleState.limit.get(),
          current: scheduleState.page.get(),
          total: scheduleState.total.get(),
          hideOnSinglePage: true,
          onChange: changePage,
        }}
      />
      {scheduleState.total.get() > 0 && (
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
