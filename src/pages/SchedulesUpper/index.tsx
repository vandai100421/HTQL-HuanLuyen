import React, { useEffect, useState } from "react";
import TableComponent from "./subcomponents/Table";
import { Button, Card, Input, Space, message } from "antd";
import CardTitle from "components/CardTitle";
import { SearchOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { getAllScheduleUpper } from "pages/Schedules/store";
import { scheduleApi } from "apis/schedule";
import { TypeSchedule } from "constants/types/schedule.type";
import { CommonGetAllParams } from "constants/types/common.type";
import { fetchCompaniesTree } from "pages/Companies/store";

const Schedules = () => {
  // Filter
  useEffect(() => {
    getAllScheduleUpper();
    fetchCompaniesTree();
  }, []);

  const formFilter = useFormik<CommonGetAllParams>({
    initialValues: {
      q: "",
      page: 1,
      limit: 10,
    },
    onSubmit: (data: CommonGetAllParams) => {
      getAllScheduleUpper(data);
    },
  });


  const handleSelectItem = (data: TypeSchedule) => {
    console.log(data);
  };


  // start delete
  const handleConfirmDeleteItem = async (id: number) => {
    try {
      await scheduleApi.delete(id);
      getAllScheduleUpper();
      message.success("Xóa dữ liệu thành công");
    } catch (error) {
      message.error("Xóa dữ liệu thất bại");
    }
  };
  // end delete

  const handleChangePage = (page: number, pageSize: number) => {
    getAllScheduleUpper({
      page: page,
      limit: pageSize,
    });
  };

  return (
    <>
      <Card>
        <CardTitle
          title="Kế hoạch huấn luyện"
          subtitle="Thông tin về kế hoạch huấn luyện"
        />

        <div>
          <Space>
            <Input
              placeholder="Tìm kiếm theo tên"
              suffix={<SearchOutlined />}
              name="q"
              value={formFilter.values.q}
              onChange={formFilter.handleChange}
              onPressEnter={formFilter.submitForm}
              allowClear
            />
            <Button type="primary" onClick={formFilter.submitForm}>
              Tìm kiếm
            </Button>
          </Space>
        </div>
        <div>
          <TableComponent
            changePage={handleChangePage}
            handleSelectItem={handleSelectItem}
            handleConfirmDeleteItem={handleConfirmDeleteItem}
          />
        </div>
      </Card>
    </>
  );
};

export default Schedules;
