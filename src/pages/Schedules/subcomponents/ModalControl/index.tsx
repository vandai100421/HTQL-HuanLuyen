import React, { FC, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Upload,
  DatePicker,
} from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TypeEditSchedule } from "constants/types/schedule.type";
import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/lib/upload/interface";
import moment from "moment";

const { RangePicker } = DatePicker;

type Props = {
  visible?: boolean;
  onCancel: () => void;
  data?: any;
  onSubmit: (data: TypeEditSchedule) => void;
  okText: string;
};

const schemaControl = Yup.object().shape({});

const ModalControl: FC<Props> = ({
  visible,
  onCancel,
  data,
  onSubmit,
  okText,
}) => {
  const changeFileList: UploadProps["onChange"] = ({ file, fileList }) => {
    if (file.status !== "uploading") {
      formControl.setFieldValue("link", [fileList[fileList.length - 1]]);
    }
  };
  const formControl = useFormik<TypeEditSchedule>({
    initialValues: {
      id: 0,
      maKeHoach: "",
      tenKeHoach: "",
      link: [],
      noiDung: "",
      soBuoiHoc: 0,
      soTiet: 0,
      thoiGianBatDau: "",
      thoiGianKetThuc: "",
      donViId:  Number(window.sessionStorage.getItem("donViId")),
    },
    validationSchema: schemaControl,
    onSubmit: (data) => {
      onSubmit(data);
      formControl.resetForm();
    },
  });

  useEffect(() => {
    if (data) {
      const {
        id,
        maKeHoach,
        tenKeHoach,
        link,
        noiDung,
        soBuoiHoc,
        soTiet,
        thoiGianBatDau,
        thoiGianKetThuc,
        donViId,
      } = data;
      formControl.setValues({
        id,
        maKeHoach,
        tenKeHoach,
        link: [
          {
            uid: "1",
            name: link,
            status: "done",
            url: process.env.REACT_APP_DOWNLOAD_URL + link,
          },
        ],
        noiDung,
        soBuoiHoc,
        soTiet,
        thoiGianBatDau,
        thoiGianKetThuc,
        donViId,
      });
    }
  }, [visible]);

  const chagneSoBuoiHoc = (value: number) => {
    formControl.setFieldValue("soBuoiHoc", value);
  };
  const chagnesoTietHoc = (value: number) => {
    formControl.setFieldValue("soTiet", value);
  };

  const handleChangeRangePicker = (
    value: any,
    dateStrings: [string, string]
  ) => {
    formControl.setFieldValue(
      "thoiGianBatDau",
      moment(dateStrings[0]).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    );
    formControl.setFieldValue(
      "thoiGianKetThuc",
      moment(dateStrings[1]).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControl.submitForm}
    >
      <Form layout="vertical" encType="multipart/form-data">

      <Form.Item
          label="Mã kế hoạch"
          validateStatus={
            formControl.errors.maKeHoach && formControl.touched.maKeHoach
              ? "error"
              : ""
          }
          help={
            formControl.errors.maKeHoach && formControl.touched.maKeHoach
              ? formControl.errors.maKeHoach
              : null
          }
        >
          <Input
            name="maKeHoach"
            placeholder="Nhập tên kế hoạch"
            value={formControl.values.maKeHoach}
            onChange={formControl.handleChange}
            onBlur={formControl.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Tên kế hoạch"
          validateStatus={
            formControl.errors.tenKeHoach && formControl.touched.tenKeHoach
              ? "error"
              : ""
          }
          help={
            formControl.errors.tenKeHoach && formControl.touched.tenKeHoach
              ? formControl.errors.tenKeHoach
              : null
          }
        >
          <Input
            name="tenKeHoach"
            placeholder="Nhập tên kế hoạch"
            value={formControl.values.tenKeHoach}
            onChange={formControl.handleChange}
            onBlur={formControl.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          validateStatus={
            formControl.errors.noiDung && formControl.touched.noiDung
              ? "error"
              : ""
          }
          help={
            formControl.errors.noiDung && formControl.touched.noiDung
              ? formControl.errors.noiDung
              : null
          }
        >
          <Input
            name="noiDung"
            placeholder="Nhập nội dung kế hoạch"
            value={formControl.values.noiDung}
            onChange={formControl.handleChange}
            onBlur={formControl.handleBlur}
          />
        </Form.Item>

        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item label="Số buổi học">
              <InputNumber
                value={formControl.values.soBuoiHoc}
                onChange={chagneSoBuoiHoc}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Số tiết học">
              <InputNumber
                value={formControl.values.soTiet}
                onChange={chagnesoTietHoc}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Thời gian">
          <RangePicker
            style={{ width: "100%" }}
            value={[
              JSON.parse(JSON.stringify(formControl.values.thoiGianBatDau)) &&
                moment(
                  formControl.values.thoiGianBatDau,
                  "YYYY-MM-DDTHH:mm:ss.SSSZ"
                ),
              JSON.parse(JSON.stringify(formControl.values.thoiGianKetThuc)) &&
                moment(
                  formControl.values.thoiGianKetThuc,
                  "YYYY-MM-DDTHH:mm:ss.SSSZ"
                ),
            ]}
            onChange={handleChangeRangePicker}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControl;
