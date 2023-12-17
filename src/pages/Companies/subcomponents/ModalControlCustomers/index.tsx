import { useHookstate } from "@hookstate/core";
import {
  Alert,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TreeSelect,
} from "antd";
import { TypeCompanies, TypeLoaiDonVi } from "constants/types/companies.type";
import { TypeCustomers } from "constants/types/customers.type";
import { useFormik } from "formik";
import moment from "moment";
import companiesStore from "pages/Companies/store";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

const { RangePicker } = DatePicker;

const { Option } = Select;

type Props = {
  visible?: boolean;
  onCancel: () => void;
  customers?: TypeCompanies;
  onSubmit: (data: any) => void;
  error?: string;
  okText: string;
};

const schemaEditDishType = Yup.object().shape({
  tenDonVi: Yup.string().required("Tên đơn vị không được để trống."),
});

const ModalControlCustomers: FC<Props> = ({
  visible,
  onCancel,
  customers,
  onSubmit,
  error,
  okText,
}) => {
  const formControl = useFormik({
    initialValues: {
      id: 0,
      tenDonVi: "",
      ngayThanhLap: "",
      ngayGiaiTan: "",
      donViId: 1,
      loaiDonViId: 1,
      capDonViId: 1,
      trangThai: 0,
    },
    validationSchema: schemaEditDishType,
    onSubmit: (data) => {
      onSubmit(data);
      formControl.resetForm();
    },
  });

  const companiesState = useHookstate(companiesStore);

  const changeCompany = (newValue: string) => {
    formControl.setFieldValue("donViId", newValue);
  };

  const changeTime = (value: any, dateStrings: string) => {
    const ngayThanhLap = moment(value).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    formControl.setFieldValue("ngayThanhLap", ngayThanhLap);
    formControl.setFieldValue("ngayGiaiTan", ngayThanhLap);
  };

  useEffect(() => {
    if (customers) {
      const {
        id,
        tenDonVi,
        ngayThanhLap,
        ngayGiaiTan,
        donViId,
        loaiDonViId,
        trangThai,
        capDonViId,
      } = customers;
      formControl.setValues({
        id,
        tenDonVi,
        ngayThanhLap,
        ngayGiaiTan,
        donViId,
        loaiDonViId,
        capDonViId,
        trangThai,
      });
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControl.submitForm}
      confirmLoading={formControl.isSubmitting}
    >
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Form layout="vertical">
        <Form.Item
          label="Tên đơn vị"
          validateStatus={
            formControl.errors.tenDonVi && formControl.touched.tenDonVi
              ? "error"
              : ""
          }
          help={
            formControl.errors.tenDonVi && formControl.touched.tenDonVi
              ? formControl.errors.tenDonVi
              : null
          }
        >
          <Input
            name="tenDonVi"
            placeholder="Nhập tên đơn vị"
            value={formControl.values.tenDonVi}
            onChange={formControl.handleChange}
            onBlur={formControl.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Đơn vị cấp trên">
          <TreeSelect
            style={{ width: "100%" }}
            value={formControl.values.donViId.toString()}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={companiesState.companiesTree.get()}
            placeholder="Chọn đơn vị"
            treeDefaultExpandAll
            onChange={changeCompany}
          />
        </Form.Item>
        <Form.Item label="Loại đơn vị">
          {formControl.values.loaiDonViId}
          <Select
            value={formControl.values.loaiDonViId}
            onChange={(value) =>
              formControl.setFieldValue("loaiDonViId", value)
            }
          >
            {companiesState.value.loaiDonVis.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.tenLoaiDv}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ngày thành lập" name="ngayThanhLap">
          <DatePicker
            showTime={{ showSecond: false }}
            format="DD/MM/YYYY"
            value={moment(formControl.values.ngayThanhLap, "DD/MM/YYYY")}
            onChange={changeTime}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControlCustomers;
