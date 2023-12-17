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
  const companiesState = useHookstate(companiesStore);

  return (
    <Modal visible={visible} onCancel={onCancel} okText={okText}>
      <Form layout="vertical" encType="multipart/form-data"></Form>
    </Modal>
  );
};

export default ModalControl;
