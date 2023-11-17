import { useHookstate } from "@hookstate/core";
import {
  Alert,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TreeSelect,
} from "antd";
import { TypeStudents } from "constants/types/students.type";
import { useFormik } from "formik";
import moment from "moment";
import companiesStore, { fetchCompaniesTree } from "pages/Companies/store";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

const { Option } = Select;

type Props = {
  visible?: boolean;
  onCancel: () => void;
  students?: TypeStudents;
  onSubmit: (data: any) => void;
  error?: string;
  okText: string;
};

const schemaEditStudent = Yup.object().shape({
  tenHocVien: Yup.string().required("Tên học viên không được để trống."),
});

const ModalControlStudent: FC<Props> = ({
  visible,
  onCancel,
  students,
  onSubmit,
  error,
  okText,
}) => {
  const formControlStudent = useFormik({
    initialValues: {
      id: "",
      maHocVien: "",
      tenHocVien: "",
      gioiTinh: 0,
      donViId: 1,
      ngaySinh: "",
      queQuan: "",
      soDienThoai: "",
    },
    validationSchema: schemaEditStudent,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  const companiesState = useHookstate(companiesStore);

  const changeCompany = (newValue: string) => {
    formControlStudent.setFieldValue("donViId", newValue);
  };

  const handleNgaySinh = (data: any, dateStrings: string) => {
    const timeData = moment(data).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    console.log(timeData);

    formControlStudent.setFieldValue("ngaySinh", timeData);
  };

  useEffect(() => {
    if (visible && students) {
      const {
        id,
        maHocVien,
        tenHocVien,
        gioiTinh,
        ngaySinh,
        queQuan,
        soDienThoai,
        donViId,
      } = students;
      formControlStudent.setValues({
        id,
        maHocVien,
        tenHocVien,
        gioiTinh,
        ngaySinh,
        queQuan,
        soDienThoai,
        donViId,
      });
    }
    fetchCompaniesTree();
  }, [students, visible]);

  // reset form after close
  useEffect(() => {
    if (!visible) formControlStudent.resetForm();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlStudent.submitForm}
      confirmLoading={formControlStudent.isSubmitting}
    >
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Form layout="vertical" onFinish={formControlStudent.handleSubmit}>
        <Form.Item
          label="Tên học viên"
          validateStatus={
            formControlStudent.errors.tenHocVien &&
            formControlStudent.touched.tenHocVien
              ? "error"
              : ""
          }
          help={
            formControlStudent.errors.tenHocVien &&
            formControlStudent.touched.tenHocVien
              ? formControlStudent.errors.tenHocVien
              : null
          }
        >
          <Input
            name="tenHocVien"
            placeholder="Nhập tên học viên"
            value={formControlStudent.values.tenHocVien}
            onChange={formControlStudent.handleChange}
            onBlur={formControlStudent.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Đơn vị"
          validateStatus={
            formControlStudent.errors.tenHocVien &&
            formControlStudent.touched.tenHocVien
              ? "error"
              : ""
          }
          help={
            formControlStudent.errors.tenHocVien &&
            formControlStudent.touched.tenHocVien
              ? formControlStudent.errors.tenHocVien
              : null
          }
        >
          <TreeSelect
            style={{ width: "100%" }}
            value={formControlStudent.values.donViId.toString()}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={companiesState.companiesTree.get()}
            placeholder="Chọn đơn vị"
            treeDefaultExpandAll
            onChange={changeCompany}
          />
        </Form.Item>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item label="Ngày sinh" name="ngaySinh">
              <DatePicker
                showTime={{ showSecond: false }}
                format="DD/MM/YYYY"
                value={moment(formControlStudent.values.ngaySinh, "DD/MM/YYYY")}
                onChange={handleNgaySinh}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gioiTinh"
              label="Giới tính"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={formControlStudent.handleChange}
                value={formControlStudent.values.gioiTinh}
                allowClear
              >
                <Option value="1">Nam</Option>
                <Option value="0">Nữ</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Quê quán">
          <Input
            name="queQuan"
            placeholder="Nhập quê quán học viên"
            value={formControlStudent.values.queQuan}
            onChange={formControlStudent.handleChange}
            onBlur={formControlStudent.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            name="soDienThoai"
            placeholder="Nhập số điện thoại học viên"
            value={formControlStudent.values.soDienThoai}
            onChange={formControlStudent.handleChange}
            onBlur={formControlStudent.handleBlur}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControlStudent;
