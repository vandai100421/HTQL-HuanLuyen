import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Space } from "antd";
import CardTitle from "components/CardTitle";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import TablePermissson from "./subcomponents/TablePermissions";
import ModalControlPermission from "./subcomponents/ModalControlPermission";
import {
  TypeCreatePermission,
  TypeEditPermission,
  TypePermission,
} from "constants/types/permission.type";
import permissionStore, { fetchPermissionList } from "pages/Permissions/store";
import permissionApi from "apis/permission";
import { useHookstate } from "@hookstate/core";

const Permission = () => {
  const permissionState = useHookstate(permissionStore);

  useEffect(() => {
    fetchPermissionList();
  }, []);

  const formFilter = useFormik({
    initialValues: {
      name: "",
      status: "all",
      start_time: null,
      end_time: null,
    },
    onSubmit: (data: any) => {
      fetchPermissionList(data);
    },
  });

  const handleChangePage = (page: number, pageSize: number) => {
    const params = {
      ...(formFilter.values as any),
      page,
      limit: pageSize,
    };
    fetchPermissionList(params);
  };

  // Add Permission
  const [visibleAddPermission, setVisibleAddPermission] =
    useState<boolean>(false);
  const [addPermissionError, setAddPermissionError] = useState<string>("");

  const handleSubmitAddPermission = async (data: TypeCreatePermission) => {
    try {
      await permissionApi.create(data);
      setAddPermissionError("");
      message.success("Thêm mới nhóm người dùng thành công.");
      formFilter.submitForm();
      setVisibleAddPermission(false);
    } catch (error: any) {
      setAddPermissionError(error.response.data.error.message);
    }
  };

  // Edit Permission
  const [visibleEditPermission, setVisibleEditPermission] =
    useState<boolean>(false);
  const [permissionSelected, setpermissionSelected] =
    useState<TypePermission>();

  const [editPermissionError, setEditPermissionError] = useState<string>("");

  const handleOpenEditPermission = (permission: TypePermission) => {
    setpermissionSelected(permission);
    setVisibleEditPermission(true);
  };

  const handleSubmitEditPermission = async (data: TypeEditPermission) => {
    try {
      if (!permissionSelected) return;
      await permissionApi.update(data);
      setEditPermissionError("");
      message.success("Cập nhật danh mục thành công.");
      formFilter.submitForm();
      setVisibleEditPermission(false);
    } catch (error: any) {
      setEditPermissionError(error.response.data.error.message);
    }
  };

  // start delete
  const handleConfirmDeletePermission = async (id: number) => {
    try {
      await permissionApi.delete(id);
      message.success("Xóa danh mục thành công");
      const params = {
        ...(formFilter.values as any),
      };
      fetchPermissionList(params);
    } catch (error: any) {
      message.error(error.response.data.error.message);
    }
  };
  // end delete

  return (
    <>
      <ModalControlPermission
        visible={visibleAddPermission}
        onCancel={() => setVisibleAddPermission(false)}
        onSubmit={handleSubmitAddPermission}
        okText="Thêm"
        error={addPermissionError}
      />
      <ModalControlPermission
        visible={visibleEditPermission}
        onCancel={() => setVisibleEditPermission(false)}
        permission={permissionSelected}
        okText="Cập nhật"
        onSubmit={handleSubmitEditPermission}
        error={editPermissionError}
      />
      <div>
        <Card>
          <CardTitle
            title="Quyền"
            subtitle="Tổng hợp tổng hợp các quyền có trong hệ thống"
          />
          <div>
            <Space>
              <Input
                placeholder="Tên quyền"
                suffix={<SearchOutlined />}
                name="name"
                value={formFilter.values.name}
                onChange={formFilter.handleChange}
                allowClear
              />
              <Button type="primary" onClick={formFilter.submitForm}>
                Tìm kiếm
              </Button>
            </Space>
          </div>
          {formFilter.values.status !== "deleted" && (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setVisibleAddPermission(true)}
              style={{ marginBottom: 16, float: "right" }}
            >
              Tạo mới
            </Button>
          )}

          <TablePermissson
            // permissions={permissionState.permissions.get()}
            onChangePage={handleChangePage}
            onClickEditPermission={handleOpenEditPermission}
            onConfirmDeletePermission={handleConfirmDeletePermission}
          />
        </Card>
      </div>
    </>
  );
};

export default Permission;
