import React, { useEffect } from "react";
import { Button, Card, Input, Space } from "antd";
import CardTitle from "components/CardTitle";
import { SearchOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { getAllSchedule } from "./store";
import { CommonGetAllParams } from "constants/types/common.type";

const StatisticByDiligence = () => {
  // Filter
  useEffect(() => {
    getAllSchedule();
  }, []);

  const formFilter = useFormik<CommonGetAllParams>({
    initialValues: {
      q: "",
      page: 1,
      limit: 10,
    },
    onSubmit: (data: CommonGetAllParams) => {
      getAllSchedule(data);
    },
  });

  return (
    <>
      <Card>
        <CardTitle
          title="Thống kê kết quả huấn luyện"
          subtitle="Thông tin thống kê kết quả huấn luyện theo chuyên cần"
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
      </Card>
    </>
  );
};

export default StatisticByDiligence;
