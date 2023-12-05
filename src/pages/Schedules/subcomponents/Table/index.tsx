import React, { FC } from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import table from "antd/lib/table";

type Props = {
  handleSelectItem: (data: any) => void;
  handleConfirmDeleteItem: (id: number) => void;
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const TableComponent: FC<Props> = ({
  handleConfirmDeleteItem,
  handleSelectItem,
}) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Thao tác",
      render: (_, item: any) => (
        <>
          <Space direction="horizontal">
            <Button
              size="small"
              type="link"
              onClick={() => handleSelectItem(table)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Xóa item nay?"
              onConfirm={() => handleConfirmDeleteItem(item.id)}
            >
              <Button
                size="small"
                type="link"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableComponent;
