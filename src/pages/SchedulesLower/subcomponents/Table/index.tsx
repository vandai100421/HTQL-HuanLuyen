import React, { FC } from "react";
import { Button, Popconfirm, Row, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import scheduleStore from "pages/Schedules/store";
import { TypeSchedule } from "constants/types/schedule.type";
import { utils, writeFile } from "xlsx";
import moment from "moment";
import { followPlanApi } from "apis/followPlan";
import { resultPlanApi } from "apis/resultPlan";
import followPlanStore from "pages/FollowPlans/store";
import resultPlanStore from "pages/ResultPlan/store";
import { useNavigate } from "react-router-dom";
import { FOLLOWPLANS, RESULT_PLAN } from "routes/route.constant";

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
  const followPlanState = useHookstate(followPlanStore);
  const resultPlanState = useHookstate(resultPlanStore);
  const navigate = useNavigate();

  const handleCreateFollowPlan = async (id: number) => {
    try {
      await followPlanApi.createBuoiHoc(id);
      followPlanState.merge({ id: id });
      navigate(FOLLOWPLANS);
      message.success("Tạo danh sách điểm danh thành công!");
    } catch (error) {
      message.error("Lỗi khi tạo danh sách điểm danh!");
    }
  };

  const handleDetailFollowPlan = (id: number) => {
    window.sessionStorage.setItem("duocSua", "0");
    followPlanState.merge({ id: id });
    navigate(FOLLOWPLANS);
  };

  const handleCreateResultPlan = async (id: number) => {
    try {
      await resultPlanApi.createKQ(id);
      resultPlanState.merge({ id: id });
      navigate(RESULT_PLAN);
      message.success("Tạo danh sách thành công!");
    } catch (error) {
      message.error("Lỗi khi tạo danh sách!");
    }
  };
  const handleDetailResultPlan = (id: number) => {
    window.sessionStorage.setItem("duocSua", "0");
    resultPlanState.merge({ id: id });
    navigate(RESULT_PLAN);
  };

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
      title: "Điểm danh",
      render: (_, record) => (
        <>
          {record.daTaoBH === 1 ? (
            <Button
              type="text"
              onClick={() => handleDetailFollowPlan(record.id)}
            >
              Chi tiết
            </Button>
          ) : null}
        </>
      ),
    },
    {
      title: "Kết quả",
      render: (_, record) => (
        <>
          {record.daTaoKQ === 1 ? (
            <Button
              type="text"
              onClick={() => handleDetailResultPlan(record.id)}
            >
              Chi tiết
            </Button>
          ) : null}
        </>
      ),
    },
    // {
    //   title: "Thao tác",
    //   render: (_, item: TypeSchedule) => (
    //     <>
    //       <Space direction="horizontal">
    //         <Button
    //           size="small"
    //           type="link"
    //           onClick={() => handleSelectItem(item)}
    //           icon={<EditOutlined style={{ color: "orange" }} />}
    //         />
    //         <Popconfirm
    //           title="Xóa kế hoạch huấn luyện này?"
    //           onConfirm={() => handleConfirmDeleteItem(item.id)}
    //         >
    //           <Button
    //             size="small"
    //             type="link"
    //             danger
    //             icon={<DeleteOutlined />}
    //           />
    //         </Popconfirm>
    //       </Space>
    //     </>
    //   ),
    // },
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
