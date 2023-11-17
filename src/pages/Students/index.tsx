import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Space } from "antd";
import CardTitle from "components/CardTitle";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import TableStudents from "pages/Students/subcomponents/TableStudents";
import {
  TypeCreateCustomers,
  TypeEditCustomers,
} from "constants/types/customers.type";
import { fetchStudentList } from "pages/Students/store";
import ModalControlStudent from "pages/Students/subcomponents/ModalControlStudent";
import {
  TypeCreateStudents,
  TypeStudents,
} from "constants/types/students.type";
import { studentAPI } from "apis/student";

const Students = () => {
  useEffect(() => {
    fetchStudentList();
  }, []);

  const formFilter = useFormik({
    initialValues: {
      q: "",
      limit: 10,
      page: 1,
    },
    onSubmit: (data: any) => {
      fetchStudentList(data);
    },
  });

  const handleChangePage = (page: number, pageSize: number) => {
    const params = {
      ...(formFilter.values as any),
      page,
      limit: pageSize,
    };
    fetchStudentList(params);
  };

  // Add Customers
  const [visibleAddStudents, setVisibleAddStudents] = useState<boolean>(false);
  const [addStudentsError, setAddStudentsError] = useState<string>("");

  const handleSubmitAddStudent = async (data: TypeCreateStudents) => {
    try {
      await studentAPI.create(data);
      setAddStudentsError("");
      message.success("Thêm mới học viên thành công.");
      formFilter.submitForm();
      setVisibleAddStudents(false);
    } catch (error: any) {
      setAddStudentsError(error);
    }
  };

  // Edit Customers
  const [visibleEditCustomers, setVisibleEditStudents] =
    useState<boolean>(false);
  const [studentsSelected, setStudentsSelected] = useState<TypeStudents>();
  const [editStudentsError, setEditStudentsError] = useState<string>("");
  const handleOpenEditCustomers = (student: TypeStudents) => {
    setStudentsSelected(student);
    setVisibleEditStudents(true);
  };

  const handleSubmitEditCustomers = async (data: TypeCreateStudents) => {
    try {
      if (!studentsSelected) return;
      await studentAPI.update(data.id, data);
      setEditStudentsError("");
      message.success("Cập nhật học viên thành công.");
      formFilter.submitForm();
      setVisibleEditStudents(false);
    } catch (error: any) {
      setEditStudentsError(error.response.data.error.message);
    }
  };

  // start delete
  const handleConfirmDeleteCustomers = async (id: string) => {
    try {
      await studentAPI.delete(id);
      message.success("Xóa học viên thành công");
      const params = {
        ...(formFilter.values as any),
      };
      fetchStudentList(params);
    } catch (error: any) {
      message.error(error.response.data.error.message);
    }
  };
  // end delete

  return (
    <>
      <ModalControlStudent
        visible={visibleAddStudents}
        onCancel={() => setVisibleAddStudents(false)}
        onSubmit={handleSubmitAddStudent}
        okText="Thêm"
        error={addStudentsError}
      />
      <ModalControlStudent
        visible={visibleEditCustomers}
        onCancel={() => setVisibleEditStudents(false)}
        students={studentsSelected}
        okText="Cập nhật"
        onSubmit={handleSubmitEditCustomers}
        error={editStudentsError}
      />
      <div>
        <Card>
          <CardTitle
            title="Danh sách học viên"
            subtitle="Thông tin chi tiết danh sách học viên"
          />
          <div>
            <Space>
              <Input
                placeholder="Tên học viên"
                suffix={<SearchOutlined />}
                name="q"
                value={formFilter.values.q}
                onChange={formFilter.handleChange}
                allowClear
              />
              <Button type="primary" onClick={formFilter.submitForm}>
                Tìm kiếm
              </Button>
            </Space>
          </div>

          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setVisibleAddStudents(true)}
            style={{ marginBottom: 16, float: "right" }}
          >
            Tạo mới
          </Button>

          <TableStudents
            onChangePage={handleChangePage}
            onClickEdit={handleOpenEditCustomers}
            onConfirmDelete={handleConfirmDeleteCustomers}
          />
        </Card>
      </div>
    </>
  );
};

export default Students;
