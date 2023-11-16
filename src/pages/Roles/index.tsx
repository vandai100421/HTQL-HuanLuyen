import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Space } from "antd";
import { roleApi } from "apis/role";
import CardTitle from "components/CardTitle";
import { CreateRoleData, EditRoleData, Role } from "constants/types/role.type";
import { useFormik } from "formik";
import moment from "moment";
import styles from "pages/Roles/Roles.module.css";
import ModalControlRole from "pages/Roles/subcomponents/ModalControlRole";
import TableRole from "pages/Roles/subcomponents/TableRole";
import { useEffect, useState } from "react";
// hookstate
import { fetchRoleList } from "pages/Roles/store";

const Roles = () => {
  useEffect(() => {
    fetchRoleList();
  }, []);

  const formFilter = useFormik({
    initialValues: {
      name: "",
      code: "",
      status: "",
      start_time: null,
      end_time: null,
    },
    onSubmit: (data: any) => {
      fetchRoleList(data);
    },
  });

  const handleChangePage = (page: number, pageSize: number) => {
    const params = {
      ...(formFilter.values as any),
      page,
      limit: pageSize,
    };
    fetchRoleList(params);
  };

  const handleChangeFilterDate = (dates: any, dateStrings: [any, any]) => {
    formFilter.setValues({
      ...formFilter.values,
      start_time: dateStrings[0],
      end_time: dateStrings[1],
    });
  };

  // Add Role
  const [visibleAddRole, setVisibleAddRole] = useState<boolean>(false);
  const [addRoleError, setAddRoleError] = useState<string>("");

  const handleSubmitAddRole = async (data: CreateRoleData) => {
    try {
      await roleApi.create(data);
      setAddRoleError("");
      message.success("Thêm mới nhóm người dùng thành công.");
      formFilter.submitForm();
      setVisibleAddRole(false);
    } catch (error: any) {
      setAddRoleError("Lỗi khi thêm mới người dùng");
    }
  };

  // Edit role
  const [visibleEditRole, setVisibleEditRole] = useState<boolean>(false);
  const [roleSelected, setRoleSelected] = useState<Role>();

  const [editRoleError, setEditRoleError] = useState<string>("");

  const handleOpenEditRole = (role: Role) => {
    setRoleSelected(role);
    setVisibleEditRole(true);
  };

  const handleSubmitEditRole = async (data: EditRoleData) => {
    try {
      if (!roleSelected) return;
      await roleApi.update(data);
      setEditRoleError("");
      message.success("Cập nhật nhóm người dùng thành công.");
      formFilter.submitForm();
      setVisibleEditRole(false);
    } catch (error: any) {
      setEditRoleError(error.response.data.error.message);
    }
  };

  // start delete
  const handleConfirmDeleteRole = async (id: number) => {
    try {
      await roleApi.delete(id);
      message.success("Xóa nhóm quyền thành công");
      const params = {
        ...(formFilter.values as any),
      };
      fetchRoleList(params);
    } catch (error: any) {
      message.error(error.response.data.error.message);
    }
  };
  // end delete

  return (
    <>
      <ModalControlRole
        visible={visibleAddRole}
        onCancel={() => setVisibleAddRole(false)}
        onSubmit={handleSubmitAddRole}
        okText="Thêm"
        error={addRoleError}
      />
      <ModalControlRole
        visible={visibleEditRole}
        onCancel={() => setVisibleEditRole(false)}
        role={roleSelected}
        okText="Cập nhật"
        onSubmit={handleSubmitEditRole}
        error={editRoleError}
      />
      <div className={styles.wrapper}>
        <Card bordered={false}>
          <CardTitle
            title="Quản lý nhóm quyền"
            subtitle="Tổng hợp nhóm quyền người dùng trong hệ thống"
          />

          <div className={styles.filter}>
            <Space>
              <Input
                placeholder="Tên nhóm quyền"
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
            <div className={styles.action}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setVisibleAddRole(true)}
              >
                Tạo mới
              </Button>
            </div>
          )}
          <TableRole
            onChangePage={handleChangePage}
            onClickEditRole={handleOpenEditRole}
            onConfirmDeleteRole={handleConfirmDeleteRole}
          />
        </Card>
      </div>
    </>
  );
};

export default Roles;
