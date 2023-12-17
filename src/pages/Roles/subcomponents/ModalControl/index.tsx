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
  onSubmit: (data: any) => void;
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
  const formControlData = useFormik<any>({
    initialValues: {
      id: 0,
      tenKeHoach: "",
      link: [],
    },
    validationSchema: schemaControl,
    onSubmit: (data) => {
      onSubmit(data);
      formControlData.resetForm();
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     const { id, tenKeHoach, link, nguoiGui, donViIds } = data;
  //     formControlData.setValues({
  //       id,
  //       tenKeHoach,
  //       link: [
  //         {
  //           uid: "1",
  //           name: link.slice(8),
  //           status: "done",
  //           url: process.env.REACT_APP_DOWNLOAD_URL + link,
  //         },
  //       ],
  //     });
  //   }
  // }, [visible]);

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
        <Form.Item label="Đơn vị">
          {/* <TreeSelect
            style={{ width: "100%" }}
            treeCheckable={true}
            value={
              formControlData.values.donViId
                ? formControlData.values.donViId
                : "1"
            }
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={companiesState.companiesTree.get()}
            placeholder="Chọn đơn vị"
            treeDefaultExpandAll
            onChange={changeCompany}
          /> */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalControl;
