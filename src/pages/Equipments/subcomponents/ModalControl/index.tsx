import React, { FC, useEffect } from "react";
import { Col, Form, Input, Modal, Row, Select, TreeSelect } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TypeEditEquipment } from "constants/types/equipment.type";
import { useHookstate } from "@hookstate/core";
import companiesStore from "pages/Companies/store";
const { Option } = Select;

type Props = {
  visible?: boolean;
  onCancel: () => void;
  data?: any;
  onSubmit: (data: any) => void;
  okText: string;
};

const schemaControl = Yup.object().shape({
  tenTTB: Yup.string().required("Tên trang thiết bị không được để trống."),
});

const ModalControl: FC<Props> = ({
  visible,
  onCancel,
  data,
  onSubmit,
  okText,
}) => {
  const companiesState = useHookstate(companiesStore);
  const formControlData = useFormik<TypeEditEquipment>({
    initialValues: {
      id: 0,
      tenTTB: "",
      capDo: 1,
      tinhTrang: 1,
      moTa: "",
      diaDiem: "",
      donViId: 1,
    },
    validationSchema: schemaControl,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  const changeCompany = (newValue: string) => {
    formControlData.setFieldValue("donViId", newValue);
  };

  const changeCapDo = (value: number) => {
    formControlData.setFieldValue("capDo", value);
  };

  const changeTinhTrang = (value: number) => {
    formControlData.setFieldValue("tinhTrang", value);
  };

  useEffect(() => {
    if (data) {
      const { id, tenTTB, capDo, tinhTrang, moTa, diaDiem, donViId } = data;

      formControlData.setValues({
        id,
        tenTTB,
        capDo,
        tinhTrang,
        moTa,
        diaDiem,
        donViId,
      });
    }
    
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlData.submitForm}
    >
      <Form layout="vertical">
        <Form.Item
          label="Tên bàn"
          validateStatus={
            formControlData.errors.tenTTB && formControlData.touched.tenTTB
              ? "error"
              : ""
          }
          help={
            formControlData.errors.tenTTB && formControlData.touched.tenTTB
              ? formControlData.errors.tenTTB
              : null
          }
        >
          <Input
            name="tenTTB"
            placeholder="Nhập tên trang thiết bị"
            value={formControlData.values.tenTTB}
            onChange={formControlData.handleChange}
            onBlur={formControlData.handleBlur}
          />
        </Form.Item>

        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item name="capDo" label="Cấp độ">
              <Select
                placeholder="Chọn cấp độ"
                defaultValue={formControlData.values.capDo}
                value={formControlData.values.capDo}
                onChange={changeCapDo}
                allowClear
              >
                <Option value={1} key={1}>
                  Cấp 1
                </Option>
                <Option value={2} key={2}>
                  Cấp 2
                </Option>
                <Option value={3} key={3}>
                  Cấp 3
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tinhTrang" label="Tình trạng">
              <Select
                placeholder="Chọn tình trạng"
                defaultValue={formControlData.values.tinhTrang}
                value={formControlData.values.tinhTrang}
                onChange={changeTinhTrang}
                allowClear
              >
                <Option value={1} key={1}>
                  Đang sử dụng
                </Option>
                <Option value={2} key={2}>
                  Lưu kho
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả"
          validateStatus={
            formControlData.errors.moTa && formControlData.touched.moTa
              ? "error"
              : ""
          }
          help={
            formControlData.errors.moTa && formControlData.touched.moTa
              ? formControlData.errors.moTa
              : null
          }
        >
          <Input
            name="moTa"
            placeholder="Nhập mô tả"
            value={formControlData.values.moTa}
            onChange={formControlData.handleChange}
            onBlur={formControlData.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          validateStatus={
            formControlData.errors.diaDiem && formControlData.touched.diaDiem
              ? "error"
              : ""
          }
          help={
            formControlData.errors.diaDiem && formControlData.touched.diaDiem
              ? formControlData.errors.diaDiem
              : null
          }
        >
          <Input
            name="diaDiem"
            placeholder="Nhập địa điểm"
            value={formControlData.values.diaDiem}
            onChange={formControlData.handleChange}
            onBlur={formControlData.handleBlur}
          />
        </Form.Item>

        <Form.Item label="Đơn vị">
          <TreeSelect
            style={{ width: "100%" }}
            value={formControlData.values.donViId.toString()}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={companiesState.companiesTree.get()}
            placeholder="Chọn đơn vị"
            treeDefaultExpandAll
            onChange={changeCompany}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControl;
