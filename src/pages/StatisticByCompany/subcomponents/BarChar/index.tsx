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
      text: "Thống kê kết quả",
    },
  },
};

type Props = {
  data: any;
};

const BarChart: FC<Props> = ({ data }) => {
  const labels = data.map((item: any) => item.tenKeHoach);
  const slKhongDat = data.map((item: any) => item.slKhongDat);
  const slDat = data.map((item: any) => item.slDat);
  const slKha = data.map((item: any) => item.slKha);
  const slGioi = data.map((item: any) => item.slGioi);
  const slXuatSac = data.map((item: any) => item.slXuatSac);

  const datas = {
    labels,
    datasets: [
      {
        label: "Không đạt",
        data: slKhongDat,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Đạt",
        data: slDat,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Khá",
        data: slKha,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "Giỏi",
        data: slGioi,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Xuất sắc",
        data: slXuatSac,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };
  return <Bar options={options} data={datas} />;
};

export default BarChart;
