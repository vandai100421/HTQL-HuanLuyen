import React, { useEffect } from "react";
import { Button, Card, Input, Space } from "antd";
import CardTitle from "components/CardTitle";
import { SearchOutlined } from "@ant-design/icons";
import { getChuyenCanByLevelYourself } from "./store";

const StatisticByDiligence = () => {
  // Filter
  useEffect(() => {
    getChuyenCanByLevelYourself();
  }, []);

  return (
    <>
      <Card>
        <CardTitle
          title="Thống kê kết quả huấn luyện"
          subtitle="Thông tin thống kê kết quả huấn luyện theo chuyên cần"
        />

        <div>
          <Space>
           sdf
          </Space>
        </div>
      </Card>
    </>
  );
};

export default StatisticByDiligence;
