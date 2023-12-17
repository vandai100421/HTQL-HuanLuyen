import React from "react";
import { Card, Space, Select, Form } from "antd";
import CardTitle from "components/CardTitle";
import TableComponent from "./subcomponents/Table";

const { Option } = Select;

const ResultPlan = () => {
  return (
    <>
      <div>
        <Card>
          <CardTitle
            title="Theo dõi kế hoạch"
            subtitle="Thông tin về theo dõi kế hoạch"
          />
          <div>
            <Space>
              <Form>
                <Form.Item label="Chọn kế hoạch">
                  <Select style={{ width: 200 }}>
                    <Option>Value 1</Option>
                    <Option>Value 2</Option>
                    <Option>Value 3</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Space>
          </div>
          <TableComponent />
        </Card>
      </div>
    </>
  );
};

export default ResultPlan;
