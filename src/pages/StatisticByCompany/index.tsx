import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Select, Space } from "antd";
import CardTitle from "components/CardTitle";
import statisicStore, {
  getKTDVByLevelLower,
} from "pages/StatisticByDiligence/store";
import companiesStore, { fetchCompaniesList } from "pages/Companies/store";
import { useHookstate } from "@hookstate/core";
import BarChart from "./subcomponents/BarChar";

const { Option } = Select;

const StatisticByDiligence = () => {
  const companiesState = useHookstate(companiesStore);
  const statisticState = useHookstate(statisicStore);

  const [data, setData] = useState();
  const [selectedCompany, setSelectedCompany] = useState<number>();
  // Filter
  useEffect(() => {
    getKTDVByLevelLower({ donViId: selectedCompany });
  }, [selectedCompany]);

  useEffect(() => {
    fetchCompaniesList();
  }, []);
  useEffect(() => {
    const statisticPieChart = () => {
      let dataRes: any = [];
      statisticState.value.dvData.forEach((item, index) => {
        const existingItem = dataRes.find(
          (p: any) => item.tenKeHoach === p.tenKeHoach
        );
        if (existingItem) {
          dataRes = dataRes.map((item: any) => {
            if (item.tenKeHoach === existingItem.tenKeHoach) {
              return {
                ...item,
                slKhongDat: item.slKhongDat + existingItem.slKhongDat,
                slDat: item.slDat + existingItem.slDat,
                slKha: item.slKha + existingItem.slKha,
                slGioi: item.slGioi + existingItem.slGioi,
                slXuatSac: item.slXuatSac + existingItem.slXuatSac,
                slThamGia: item.slThamGia + existingItem.slThamGia,
              };
            }
            return item;
          });
        } else {
          dataRes.push({
            tenKeHoach: item.tenKeHoach,
            slKhongDat: item.slKhongDat,
            slDat: item.slDat,
            slKha: item.slKha,
            slGioi: item.slGioi,
            slXuatSac: item.slXuatSac,
            slThamGia: item.slThamGia,
          });
        }
      });
      return dataRes;
    };

    const result = statisticPieChart();
    setData(result);
  }, [statisticState]);
  
  const handleSelectCompany = (value: number) => {
    setSelectedCompany(value);
  };

  return (
    <>
      <Card bordered={false}>
        <CardTitle
          title="Thống kê huấn luyện theo đơn vị"
          subtitle="Thông tin thống kê kết quả huấn luyện theo đơn vị"
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
          <Row>
            <BarChart data={data} />
          </Row>
        )}
      </Card>
    </>
  );
};

export default StatisticByDiligence;
