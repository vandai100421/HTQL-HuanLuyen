import React, { useState } from "react";
import { Button, Checkbox, Row, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useHookstate } from "@hookstate/core";
import followPlanStore, { TypeItemFollowPlan } from "pages/FollowPlans/store";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { followPlanApi } from "apis/followPlan";
import { TypeUpdateFollowPlan } from "constants/types/followPlan.type";

const TableComponent = () => {
  const followPlanState = useHookstate(followPlanStore);

  let dataTable: any = [];
  let dataDiemDanh: any = [];
  const arrBuoiHocId: any = [];

  followPlanState.followPlans.get().length &&
    followPlanState.followPlans.get().forEach((item, index) => {
      if (index < followPlanState.soBuoiHoc.get())
        arrBuoiHocId.push(item.buoiHocId);
      dataDiemDanh.push({
        buoiHocId: item.buoiHocId,
        hocVienId: item.hocVienId,
        coMat: item.coMat,
      });
      const existingItem = dataTable.find(
        (p: TypeItemFollowPlan) => p.hocVienId === item.hocVienId
      );

      const newObj = JSON.parse(`{"${item.buoiHocId}": ${item.coMat}}`);

      if (existingItem) {
        dataTable = dataTable.map((item: any) => {
          if (item.hocVienId === existingItem.hocVienId) {
            return { ...item, ...newObj };
          }
          return item;
        });
      } else {
        dataTable.push({
          fullname: item.tenHocVien,
          hocVienId: item.hocVienId,
          ...JSON.parse(`{"${item.buoiHocId}": ${item.coMat}}`),
        });
      }
    });

  const _col = [];

  for (let i = 0; i < followPlanState.soBuoiHoc.get(); i++) {
    _col.push({
      title: "Buổi " + (i + 1),
      dataIndex: "buoi" + (i + 1),
      key: "buoi" + (i + 1),
      render: (value: number, record: any) => (
        <>
          <Checkbox
            onChange={(e: CheckboxChangeEvent) => {
              handleCheck(e.target.checked, arrBuoiHocId[i], record.hocVienId);
            }}
          />
        </>
      ),
      align: "center",
    });
  }

  const columns: any = [
    {
      title: "Họ và tên",
      width: 200,
      dataIndex: "fullname",
      key: "name",
      fixed: "left",
    },
    ..._col,
  ];

  const handleCheck = (
    value: boolean,
    buoiHocId: number,
    hocVienId: number
  ) => {
    dataDiemDanh = dataDiemDanh.map((item: any) => {
      if (item.hocVienId === hocVienId && item.buoiHocId === buoiHocId) {
        return { ...item, coMat: value ? 1 : 0 };
      }
      return item;
    });
  };

  const handleFinish = async () => {
    try {
      const data: TypeUpdateFollowPlan = {
        keHoachId: followPlanState.id.get(),
        details: dataDiemDanh,
      };
      await followPlanApi.updateListDD(data);
      message.success("Cập nhật điểm danh thành công");
    } catch (error) {
      message.error("Lối khi cập nhật điểm danh");
    }
  };

  return (
    <>
      {followPlanState.value.id !== 0 && (
        <Row justify="end" style={{ padding: "12px 0" }}>
          <Button type="primary" onClick={handleFinish}>Cập nhật</Button>
        </Row>
      )}
      <Table columns={columns} dataSource={dataTable} />
    </>
  );
};

export default TableComponent;
