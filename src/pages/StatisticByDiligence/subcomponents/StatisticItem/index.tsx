import React, { FC } from "react";
import styles from "pages/Dashboard/subcomponents/StatisticItem/StatisticalItem.module.css";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  unit: string;
};

const StatisticItem: FC<Props> = ({ title, unit }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <div className={styles.textMedium}>{title}</div>
      <div className={styles.statistic}>
        <Space></Space>
      </div>
      <Button
        // className={styles.textMedium}
        type="link"
        onClick={() => navigate("/customers")}
        size="small"
      >
        Xem chi tiết
      </Button>
    </div>
  );
};

export default StatisticItem;
