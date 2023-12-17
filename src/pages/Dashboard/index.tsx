import React, { useEffect } from "react";
import StatisticItem from "pages/Dashboard/subcomponents/StatisticItem";
import { Card, Col, Row } from "antd";
import CardTitle from "components/CardTitle";

const Dashboard = () => {
  return (
    <Card bordered={false}>
      <CardTitle
        title="DASHBOARD"
        subtitle="Tổng hợp thông tin về thống quản lý huấn luyện"
      />
    </Card>
  );
};

export default Dashboard;
