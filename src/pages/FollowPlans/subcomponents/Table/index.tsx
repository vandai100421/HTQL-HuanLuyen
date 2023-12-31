import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Row, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useHookstate } from "@hookstate/core";
import followPlanStore, {
  TypeItemFollowPlan,
  getAllFollowPlan,
} from "pages/FollowPlans/store";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { followPlanApi } from "apis/followPlan";
import { TypeUpdateFollowPlan } from "constants/types/followPlan.type";

const TableComponent = () => {
  const followPlanState = useHookstate(followPlanStore);
  const dataDiemDanh = useRef<Array<any>>([]);
  const [reset, setReset] = useState(false);
  const dataTable = useRef<Array<any>>([]);
  const arrBuoiHocId: any = [];
  const dataCoMat = useRef<any>([]);

  followPlanState.followPlans.get().length &&
    followPlanState.followPlans.get().forEach((item, index) => {
      if (index < followPlanState.soBuoiHoc.get())
        arrBuoiHocId.push(item.buoiHocId);
      dataDiemDanh.current.length < followPlanState.followPlans.get().length &&
        dataDiemDanh.current.push({
          buoiHocId: item.buoiHocId,
          hocVienId: item.hocVienId,
          coMat: item.coMat,
        });
      const existingItem = dataTable.current.find(
        (p: TypeItemFollowPlan) => p.hocVienId === item.hocVienId
      );

      const newObj = JSON.parse(`{"${item.buoiHocId}": ${item.coMat}}`);

      if (existingItem) {
        dataTable.current = dataTable.current.map((item: any) => {
          if (item.hocVienId === existingItem.hocVienId) {
            return { ...item, ...newObj };
          }
          return item;
        });
      } else {
        dataTable.current.push({
          fullname: item.tenHocVien,
          hocVienId: item.hocVienId,
          ...JSON.parse(`{"${item.buoiHocId}": ${item.coMat}}`),
        });
      }
    });

  const _col = [];

  const soNguoi =
    followPlanState.followPlans.get().length / followPlanState.soBuoiHoc.get();

  for (let i = 0; i < followPlanState.soBuoiHoc.get(); i++) {
    _col.push({
      title: "Buổi " + (i + 1),
      dataIndex: arrBuoiHocId[i],
      key: "buoi" + (i + 1),
      render: (value: number, record: any, index: number) => (
        <>
          {dataTable.current[index][arrBuoiHocId[i]] === 1 ? true : false}
          {reset ? (
            <Checkbox
              checked={
                dataTable.current[index][arrBuoiHocId[i]] === 1 ? true : false
              }
              onChange={(e: CheckboxChangeEvent) => {
                handleCheck(
                  e.target.checked,
                  arrBuoiHocId[i],
                  record.hocVienId,
                  index,
                  i
                );
              }}
            />
          ) : (
            <Checkbox
              checked={
                dataTable.current[index][arrBuoiHocId[i]] === 1 ? true : false
              }
              onChange={(e: CheckboxChangeEvent) => {
                handleCheck(
                  e.target.checked,
                  arrBuoiHocId[i],
                  record.hocVienId,
                  index,
                  i
                );
              }}
            />
          )}
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

  console.log("dataCoMat", dataCoMat.current);

  const handleCheck = async (
    value: boolean,
    buoiHocId: number,
    hocVienId: number,
    index: number,
    i: number
  ) => {
    setReset(!reset);
    dataTable.current[index][arrBuoiHocId[i]] = value;
    console.log(
      index,
      i,
      dataTable.current[index][arrBuoiHocId[i]] === 1 ? true : false
    );

    dataDiemDanh.current = dataDiemDanh.current.map((item: any) => {
      if (item.hocVienId === hocVienId && item.buoiHocId === buoiHocId) {
        return { ...item, coMat: value ? 1 : 0 };
      }
      return item;
    });
    const data: TypeUpdateFollowPlan = {
      keHoachId: followPlanState.id.get(),
      details: dataDiemDanh.current,
    };
    if (
      Number(window.sessionStorage.getItem("duocSua")) === 1 ||
      Number(window.sessionStorage.getItem("vaiTro")) === 1
    )
      await followPlanApi.updateListDD(data);
    getAllFollowPlan();
  };

  return (
    <>
      <Table columns={columns} dataSource={dataTable.current} />
    </>
  );
};

export default TableComponent;
