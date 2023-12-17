import React, { useRef, useState } from "react";
import { Button, InputNumber, Row, Table, message } from "antd";
import { useHookstate } from "@hookstate/core";
import resultPlanStore from "../../store";
import {
  TypeItemUpdateResultPlan,
  TypeUpdateResultPlan,
} from "constants/types/resultPlan.type";
import { resultPlanApi } from "apis/resultPlan";

const TableComponent = () => {
  const resultPlanState = useHookstate(resultPlanStore);
  const dataResult = useRef<Array<TypeItemUpdateResultPlan>>([]);

  const [setsetting, setSetsetting] = useState(false);

  for (let i = 0; i < resultPlanState.value.total; i++) {
    const newObj: TypeItemUpdateResultPlan = {
      ketQua: resultPlanState.value.resultPlans
        ? resultPlanState.value.resultPlans[i].ketQua
        : null,
      ketQuaId: resultPlanState.value.resultPlans
        ? resultPlanState.value.resultPlans[i].id
        : null,
    };
    dataResult.current.push(newObj);
  }

  const columns: any = [
    {
      title: "Họ và tên",
      width: 200,
      dataIndex: "tenHocVien",
      key: "name",
    },
    {
      title: "Mã học viên",
      dataIndex: "hocVienId",
      key: "hocVienId",
    },
    {
      title: "Kết quả",
      dataIndex: "ketQua",
      key: "kq",
      render: (value: number, record: any, index: number) => {
        return (
          <>
            {setsetting ? (
              <InputNumber
                max={10}
                min={1}
                value={dataResult.current[index].ketQua}
                onChange={(value) => {
                  handleChangeItemKQ(value, record.id);
                }}
              />
            ) : (
              <InputNumber
                max={10}
                min={1}
                value={dataResult.current[index].ketQua}
                onChange={(value) => {
                  handleChangeItemKQ(value, record.id);
                }}
              />
            )}
          </>
        );
      },
    },
  ];

  const handleChangeItemKQ = (value: number, idKq: number) => {
    setSetsetting(!setsetting);
    for (let i = 0; i < dataResult.current.length; i++) {
      if (dataResult.current[i].ketQuaId === idKq) {
        dataResult.current[i].ketQua = value;
        return;
      }
    }
  };

  const handleFinish = async () => {
    try {
      const data: TypeUpdateResultPlan = {
        keHoachId: resultPlanState.value.id,
        details: dataResult.current,
      };
      console.log(data);
      await resultPlanApi.updateListKQ(data);
      message.success("Cập nhật điểm danh thành công");
    } catch (error) {
      message.error("Lối khi cập nhật điểm danh");
    }
  };

  return (
    <>
      {resultPlanState.value.id !== 0 && (
        <Row justify="end" style={{ padding: "12px 0" }}>
          <Button type="primary" onClick={handleFinish}>
            Cập nhật
          </Button>
        </Row>
      )}
      <Table columns={columns} dataSource={resultPlanState.value.resultPlans} />
    </>
  );
};

export default TableComponent;
