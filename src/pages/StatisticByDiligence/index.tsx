import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Select, Space } from "antd";
import CardTitle from "components/CardTitle";
import statisicStore, { getChuyenCanByLevelLower } from "./store";
import companiesStore, { fetchCompaniesList } from "pages/Companies/store";
import { useHookstate } from "@hookstate/core";
import PieChar from "./subcomponents/PieChar";
import BarChart from "./subcomponents/Bar";

const { Option } = Select;

const StatisticByDiligence = () => {
  const companiesState = useHookstate(companiesStore);
  const statisticState = useHookstate(statisicStore);

  const [data, setData] = useState();

  const [selectedCompany, setSelectedCompany] = useState<number>();
  // Filter
  useEffect(() => {
    const param = {
      donViId: selectedCompany
        ? selectedCompany
        : Number(window.sessionStorage.getItem("donViId")),
    };
    getChuyenCanByLevelLower(param);
  }, [selectedCompany]);

  useEffect(() => {
    fetchCompaniesList();
  }, []);

  useEffect(() => {
    const statisticBarChart = () => {
      let dataRes: any = [];
      statisticState.value.ccData.forEach((item, index) => {
        const existingItem = dataRes.find(
          (p: any) => item.tenKeHoach === p.tenKeHoach
        );
        if (existingItem) {
          dataRes = dataRes.map((item: any) => {
            if (item.tenKeHoach === existingItem.tenKeHoach) {
              return {
                ...item,
                chuyenCan: item.chuyenCan + existingItem.chuyenCan,
                soBuoiHoc: item.soBuoiHoc + existingItem.soBuoiHoc,
              };
            }
            return item;
          });
        } else {
          dataRes.push({
            tenKeHoach: item.tenKeHoach,
            chuyenCan: item.chuyenCan,
            soBuoiHoc: item.soBuoiHoc,
          });
        }
      });
      return dataRes;
    };
    const result = statisticBarChart();
    setData(result);
  }, [statisticState]);

  const handleSelectCompany = (value: number) => {
    setSelectedCompany(value);
  };

  return (
    <>
      <Card bordered={false}>
        <CardTitle
          title="Thống kê huấn luyện theo chuyên cần"
          subtitle="Thông tin thống kê kết quả huấn luyện theo chuyên cần"
        />

        <div>
          <Space>
            <Form>
              <Form.Item label="Chọn đơn vị">
                <Select
                  style={{ width: 300 }}
                  value={selectedCompany}
                  onChange={handleSelectCompany}
                >
                  {companiesState.value.companies.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.tenDonVi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Space>
        </div>
        {data && (
          <>
            {/* <Row gutter={[16, 12]}>
              <Col span={12}>
                <StatisticItem
                  title={"Doanh thu trong ngày"}
                  // value={dashBoardState.today_revenue.get().toString()}
                  unit="VNĐ"
                />
              </Col>
              <Col span={12}>
                <StatisticItem
                  title={"Số khách hàng"}
                  // value={dashBoardState.customerNum.get().toString()}
                  unit="KH"
                />
              </Col>
            </Row> */}
            <Row>
              {/* <LineChart /> */}
              {/* <PieChar data={data} /> */}
              <BarChart data={data} />
            </Row>
          </>
        )}
      </Card>
    </>
  );
};

export default StatisticByDiligence;
