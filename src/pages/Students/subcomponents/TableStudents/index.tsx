import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TypeStudents } from "constants/types/students.type";
import studentsStore from "pages/Students/store";
import { FC, useMemo } from "react";

type Props = {
  onChangePage: (page: number, pageSize: number) => void;
  onClickEdit: (customers: TypeStudents) => void;
  onConfirmDelete: (id: string) => void;
};

const TableStudents: FC<Props> = ({
  onChangePage,
  onClickEdit,
  onConfirmDelete,
}) => {
  const studentsState = useHookstate(studentsStore);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Mã",
        dataIndex: "id",
      },
      {
        title: "Họ và tên",
        dataIndex: "tenHocVien",
      },
      {
        title: "Ngày sinh",
        dataIndex: "ngaySinh",
      },
      {
        title: "Đơn vị",
        dataIndex: "tenDonVi",
      },
      {
        title: "Giới tính",
        render: (value) => {
          return (
            <>
              {value.gioiTinh === 1 ? (
                <Tag color="warning">Nữ</Tag>
              ) : (
                <Tag color="success">Nam</Tag>
              )}
            </>
          );
        },
      },
      {
        title: "Thao tác",
        render: (_, students: TypeStudents) => (
          <>
            <Space direction="horizontal">
              <Button
                size="small"
                type="link"
                onClick={() => {
                  console.log(students);
                  
                  onClickEdit(students);
                }}
                icon={<EditOutlined />}
              />
              <Popconfirm
                title="Xóa học viên này?"
                onConfirm={() => onConfirmDelete(students.id)}
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
    ],
    []
  );

  return (
    <div>
      <Table
        columns={columns}
        size="small"
        bordered
        dataSource={studentsState.students.get()}
        pagination={{
          pageSize: studentsState.limit.get(),
          current: studentsState.page.get(),
          hideOnSinglePage: true,
          onChange: onChangePage,
        }}
        loading={studentsState.isLoadingGetAllStudent.get()}
      />
    </div>
  );
};

export default TableStudents;
