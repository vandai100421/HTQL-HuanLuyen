import React, { useEffect } from "react";
import { Card, Form, Select } from "antd";
import CardTitle from "components/CardTitle";
import { getAllSchedule } from "./store";

const { Option } = Select;

const StatisticByCompany = () => {
  // Filter
  useEffect(() => {
    getAllSchedule();
  }, []);

  return (
    <>
      <Card>
        <CardTitle
          title="Thống kê kết quả huấn luyện"
          subtitle="Thông tin thống kê kết quả huấn luyện theo đơn vị"
        />

        <div>
          <Form>
            <Form.Item label="Chọn đơn vị cần thống kê" style={{ width: 400 }}>
              <Select defaultValue="1">
                <Option value="1">Đơn vị mình</Option>
                <Option value="2">Đại đội 155</Option>
                <Option value="3">Đại đội 156</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default StatisticByCompany;
