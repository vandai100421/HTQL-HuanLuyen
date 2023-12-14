import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import { Button, Popconfirm, Row, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TypeStudents } from "constants/types/students.type";
import studentsStore from "pages/Students/store";
import { FC, useMemo } from "react";
import { utils, writeFile } from "xlsx";

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
              {value.gioiTinh === 0 ? (
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

  const handleExportFile = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(studentsState.students.get());
    utils.book_append_sheet(wb, ws, "TestExample");
    writeFile(wb, "Danh Sach Hoc Vien.xlsx");
  };

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
          total: studentsState.total.get(),
          hideOnSinglePage: true,
          onChange: onChangePage,
        }}
        loading={studentsState.isLoadingGetAllStudent.get()}
      />
      {studentsState.total.get() > 0 && (
        <Row justify="end" style={{ padding: "10px 0 0 0" }}>
          <Button type="primary" onClick={handleExportFile}>
            Export File
          </Button>
        </Row>
      )}
    </div>
  );
};

export default TableStudents;
