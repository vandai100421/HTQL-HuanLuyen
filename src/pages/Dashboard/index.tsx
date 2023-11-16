import React, { useEffect } from "react";
import StatisticItem from "pages/Dashboard/subcomponents/StatisticItem";
import { Card, Col, Row } from "antd";
import CardTitle from "components/CardTitle";
import ReportItem from "pages/Dashboard/subcomponents/ReportItem";
import dashBoardStore, {
  getDishesFrequency,
  getTodayRevenue,
  getTotalCustomers,
} from "./store";
import { useHookstate } from "@hookstate/core";
import { TypeDish } from "constants/types/cash.type";
import { LineChart } from "./subcomponents/Linear";

const Dashboard = () => {
  const dashBoardState = useHookstate(dashBoardStore);

  useEffect(() => {
    getTotalCustomers();
    getTodayRevenue();
    getDishesFrequency();
  }, []);

  const labelDishes: Array<string> = [];
  const numberOfDishes: Array<number> = [];

  dashBoardState.topDishes.get().map((item: TypeDish) => {
    labelDishes.push(item.name);
    item.number && numberOfDishes.push(item.number);
  });

  const dataTopDish = {
    labels: labelDishes,
    datasets: [
      {
        label: "# of Votes",
        data: numberOfDishes,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card bordered={false}>
      <CardTitle
        title="DASHBOARD"
        subtitle="Tổng hợp thông tin về thống quản lý huấn luyện"
      />
      <Row gutter={[16, 12]}>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexFlow: "column",
          }}
        >
          <Row gutter={[16, 12]}>
            <Col span={12}>
              <StatisticItem
                title={"Doanh thu trong ngày"}
                value={dashBoardState.today_revenue.get().toString()}
                unit="VNĐ"
              />
            </Col>
            <Col span={12}>
              <StatisticItem
                title={"Số khách hàng"}
                value={dashBoardState.customerNum.get().toString()}
                unit="KH"
              />
            </Col>
          </Row>
          <Row>
            <LineChart />
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 12]} style={{ paddingTop: 16 }}>
            <Col span={24}>
              <ReportItem title={"Top 5 món ưa thích"} data={dataTopDish} />
            </Col>
            {/* <Col span={12}>
          <ReportItem title={"Top 5 món ưa thích"} data={dataTopDish} />
        </Col> */}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;
