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
import { TypeCapBac } from "constants/types/capbac.type";
import { TypeChucVu } from "constants/types/chucvu.type";
import { TypeStudents } from "constants/types/students.type";
import { useFormik } from "formik";
import moment from "moment";
import commonStore, { fetchCommon } from "pages/Common/store";
import companiesStore, { fetchCompaniesTree } from "pages/Companies/store";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

const { Option } = Select;

type Props = {
  visible?: boolean;
  onCancel: () => void;
  data?: any;
  onSubmit: (data: any) => void;
  okText: string;
};

const schemaEditStudent = Yup.object().shape({
  tenHocVien: Yup.string().required("Tên học viên không được để trống."),
});

const ModalControlStudent: FC<Props> = ({
  visible,
  onCancel,
  data,
  onSubmit,
  okText,
}) => {
  const formControlStudent = useFormik({
    initialValues: {
      id: "",
      maHocVien: "",
      tenHocVien: "",
      gioiTinh: 0,
      donViId: Number(window.sessionStorage.getItem("donViId")),
      capBacId: 0,
      chucVuId: 0,
      ngaySinh: "",
      queQuan: "",
      soDienThoai: "",
    },
    validationSchema: schemaEditStudent,
    onSubmit: (data) => {
      onSubmit(data);
      formControlStudent.resetForm();
    },
  });

  const commonState = useHookstate(commonStore);

  const handleNgaySinh = (data: any) => {
    const timeData = moment(data).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    formControlStudent.setFieldValue("ngaySinh", timeData);
  };

  const handleChangeGioiTinh = (value: number) => {
    formControlStudent.setFieldValue("gioiTinh", value);
  };
  const handleChangeCapBac = (value: number) => {
    formControlStudent.setFieldValue("capBacId", value);
  };
  const handleChangeChucVu = (value: number) => {
    formControlStudent.setFieldValue("chucVuId", value);
  };

  useEffect(() => {
    if (data) {
      const {
        id,
        maHocVien,
        tenHocVien,
        gioiTinh,
        capBacId,
        chucVuId,
        ngaySinh,
        queQuan,
        soDienThoai,
        donViId,
      } = data;

      formControlStudent.setValues({
        id,
        maHocVien,
        tenHocVien,
        gioiTinh,
        capBacId,
        chucVuId,
        ngaySinh,
        queQuan,
        soDienThoai,
        donViId,
      });
    }
    fetchCommon();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlStudent.submitForm}
    >
      <Form layout="vertical">
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

        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item name="capBacId" label="Cấp bậc">
              <div style={{ display: "none" }}>
                {formControlStudent.values.capBacId}
              </div>
              <Select
                placeholder="Chọn cấp bậc"
                onChange={handleChangeCapBac}
                defaultValue={formControlStudent.values.capBacId}
                value={formControlStudent.values.capBacId}
                allowClear
              >
                {commonState.value.capBacs.map((item: TypeCapBac) => (
                  <Option value={item.id} key={item.id}>
                    {item.tenCapBac}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="chucVuId" label="Chức vụ">
              <div style={{ display: "none" }}>
                {formControlStudent.values.chucVuId}
              </div>
              <Select
                placeholder="Chọn chức vụ"
                onChange={handleChangeChucVu}
                defaultValue={formControlStudent.values.chucVuId}
                value={formControlStudent.values.chucVuId}
                allowClear
              >
                {commonState.value.chucVus.map((item: TypeChucVu) => (
                  <Option value={item.id} key={item.id}>
                    {item.tenChucVu}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item label="Ngày sinh" name="ngaySinh">
              <div style={{ display: "none" }}>
                {formControlStudent.values.ngaySinh}
              </div>
              <DatePicker
                showTime={{ showSecond: false }}
                format="DD/MM/YYYY"
                value={
                  JSON.parse(
                    JSON.stringify(formControlStudent.values.ngaySinh)
                  ) &&
                  moment(
                    formControlStudent.values.ngaySinh,
                    "YYYY-MM-DDTHH:mm:ss.SSSZ"
                  )
                }
                onChange={handleNgaySinh}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="gioiTinh" label="Giới tính">
              <div style={{ display: "none" }}>
                {formControlStudent.values.gioiTinh}
              </div>
              <Select
                placeholder="Select a option and change input text above"
                onChange={handleChangeGioiTinh}
                defaultValue={formControlStudent.values.gioiTinh}
                value={formControlStudent.values.gioiTinh}
                allowClear
              >
                <Option value={1}>Nam</Option>
                <Option value={0}>Nữ</Option>
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
