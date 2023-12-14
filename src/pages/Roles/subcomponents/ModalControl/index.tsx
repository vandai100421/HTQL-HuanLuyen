import React, { FC, useEffect } from "react";
import { Button, Form, Input, Modal, TreeSelect, Upload } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHookstate } from "@hookstate/core";
import companiesStore from "pages/Companies/store";
import { TypeEditSchedule } from "constants/types/schedule.type";
import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/lib/upload/interface";

type Props = {
  visible?: boolean;
  onCancel: () => void;
  data?: any;
  onSubmit: (data: FormData) => void;
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
  const companiesState = useHookstate(companiesStore);

  const changeFileList: UploadProps["onChange"] = ({ file, fileList }) => {
    if (file.status !== "uploading") {
      formControlData.setFieldValue("link", [fileList[fileList.length - 1]]);
    }
  };
  const formControlData = useFormik<TypeEditSchedule>({
    initialValues: {
      id: 0,
      tenKeHoach: "",
      link: [],
      nguoiGui: 0,
      donViIds: [],
    },
    validationSchema: schemaControl,
    onSubmit: (data) => {
      const formData = new FormData();
      formData.append("id", data.id.toString());
      formData.append("TenKeHoach", data.tenKeHoach);
      formData.append("nguoiGui", data.nguoiGui.toString());
      data["link"].forEach((value) => {
        if (value.originFileObj instanceof File) {
          const valueBlob = new Blob([value.originFileObj]);
          const fileOfBlob = new File([valueBlob], "" + value.name);
          formData.append("link", fileOfBlob);
        }
      });

      data["donViIds"].forEach((value) => formData.append("donViIds", value));

      onSubmit(formData);
      formControlData.resetForm();
    },
  });

  useEffect(() => {
    if (data) {
      const { id, tenKeHoach, link, nguoiGui, donViIds } = data;
      formControlData.setValues({
        id,
        tenKeHoach,
        link: [
          {
            uid: "1",
            name: link.slice(8),
            status: "done",
            url: process.env.REACT_APP_DOWNLOAD_URL + link,
          },
        ],
        nguoiGui,
        donViIds,
      });
    }
  }, [visible]);

  const changeCompany = (newValue: string[]) => {
    formControlData.setFieldValue("donViIds", newValue);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      onOk={formControlData.submitForm}
    >
      <Form layout="vertical" encType="multipart/form-data">
        <Form.Item
          label="Tên kế hoạch"
          validateStatus={
            formControlData.errors.tenKeHoach &&
            formControlData.touched.tenKeHoach
              ? "error"
              : ""
          }
          help={
            formControlData.errors.tenKeHoach &&
            formControlData.touched.tenKeHoach
              ? formControlData.errors.tenKeHoach
              : null
          }
        >
          <Input
            name="tenKeHoach"
            placeholder="Nhập tên kế hoạch"
            value={formControlData.values.tenKeHoach}
            onChange={formControlData.handleChange}
            onBlur={formControlData.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Tài liệu"
          validateStatus={
            formControlData.errors.tenKeHoach &&
            formControlData.touched.tenKeHoach
              ? "error"
              : ""
          }
          help={
            formControlData.errors.tenKeHoach &&
            formControlData.touched.tenKeHoach
              ? formControlData.errors.tenKeHoach
              : null
          }
        >
          <Upload
            onChange={changeFileList}
            fileList={formControlData.values.link}
            beforeUpload={() => {
              const reader = new FileReader();

              reader.onload = () => {
                // console.log(e.target.result);
              };
              // reader.readAsText(file);

              // Prevent upload
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Tải lên</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Đơn vị">
          <TreeSelect
            style={{ width: "100%" }}
            treeCheckable={true}
            value={
              formControlData.values.donViIds
                ? formControlData.values.donViIds
                : ["1"]
            }
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
