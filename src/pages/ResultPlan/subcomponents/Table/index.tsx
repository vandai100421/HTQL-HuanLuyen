import React, { useState } from "react";
import { Checkbox, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: any = [
  {
    fullname: "Nguyễn Văn A",
    buoi1: true,
    buoi2: false,
    buoi3: true,
    buoi4: true,
    buoi5: true,
    buoi6: true,
  },
  {
    fullname: "Nguyễn Văn B",
    buoi1: true,
    buoi2: false,
    buoi3: true,
    buoi4: false,
    buoi5: true,
    buoi6: true,
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: "Full Name",
    width: 200,
    dataIndex: "fullname",
    key: "name",
    fixed: "left",
  },
  {
    title: "Buổi 1",
    dataIndex: "buoi1",
    key: "buoi1",
    render: (value: boolean) => (
      <>
        <Checkbox value={value} />
      </>
    ),
    align: "center",
  },
  {
    title: "Buổi 2",
    dataIndex: "buoi2",
    key: "buoi2",
    render: (value: boolean) => (
      <>
        <Checkbox value={value} />
      </>
    ),
    align: "center",
  },
  {
    title: "Buổi 3",
    dataIndex: "buoi3",
    key: "buoi3",
    render: (value: boolean) => (
      <>
        <Checkbox value={value} />
      </>
    ),
    align: "center",
  },
  {
    title: "Buổi 4",
    dataIndex: "buoi4",
    key: "buoi4",
    render: (value: boolean) => (
      <>
        <Checkbox value={value} />
      </>
    ),
    align: "center",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a>action</a>,
    align: "center",
  },
];

const TableComponent = () => {
  const [fixedTop, setFixedTop] = useState(false);

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 1500 }}
      sticky={{ offsetHeader: 64 }}
    />
  );
};

export default TableComponent;
