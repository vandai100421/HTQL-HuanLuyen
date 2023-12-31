import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Thống kê chuyên cần",
    },
  },
};

type Props = {
  data: any;
};

const BarChart: FC<Props> = ({ data }) => {
  const labels = data.map((item: any) => item.tenKeHoach);
  const chuyenCans = data.map((item: any) => item.chuyenCan);
  const soBuoiHocs = data.map((item: any) => item.soBuoiHoc);

  const datas = {
    labels,
    datasets: [
      {
        label: "Có mặt",
        data: chuyenCans,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tổng số buổi",
        data: soBuoiHocs,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={datas} />;
};

export default BarChart;
