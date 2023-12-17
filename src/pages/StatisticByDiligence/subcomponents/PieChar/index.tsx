import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

type Props = {
  data: any;
};
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChar: FC<Props> = ({ data }) => {
  const labels = data.map((item: any) => item.tenKeHoach);
  const chuyenCans = data
    .map((item: any) => item.chuyenCan)
    .reduce((acc: any, current: any) => acc + current, 0);
  const soBuoiHoc = data
    .map((item: any) => item.soBuoiHoc)
    .reduce((acc: any, current: any) => acc + current, 0);

  const datas = {
    labels: ["Có mặt", "Nghỉ"],
    datasets: [
      {
        label: "# Số buổi",
        data: [chuyenCans, soBuoiHoc - chuyenCans],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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

  return <Pie data={datas} />;
};

export default PieChar;
