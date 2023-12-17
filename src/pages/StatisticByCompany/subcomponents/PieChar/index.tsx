import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

type Props = {
  data: any;
};
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChar: FC<Props> = ({ data }) => {
  const labels = data.map((item: any) => item.tenKeHoach);
  const slKhongDat = data.map((item: any) => item.slKhongDat);
  const slDat = data.map((item: any) => item.slDat);
  const slKha = data.map((item: any) => item.slKha);
  const slGioi = data.map((item: any) => item.slGioi);
  const slXuatSac = data.map((item: any) => item.slXuatSac);
  const slThamGia = data.map((item: any) => item.slThamGia);
  const datas = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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
