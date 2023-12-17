import { Card } from "antd";
import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  title: string;
  data: {
    labels: Array<string>;
    datasets: Array<{
      label: string;
      data: Array<number>;
      backgroundColor: Array<string>;
      borderColor: Array<string>;
      borderWidth: number;
    }>;
  };
};

const ReportItem: FC<Props> = ({ data, title }) => {
  return (
    <Card title={title}>
      <Pie data={data} style={{ display: "flex", justifyContent: "center" }} />
    </Card>
  );
};

export default ReportItem;
