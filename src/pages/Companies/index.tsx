import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Space } from "antd";
import CardTitle from "components/CardTitle";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import TableCustomers from "./subcomponents/TableCustomers";
import ModalControlCustomers from "./subcomponents/ModalControlCustomers";
import {
  TypeCreateCustomers,
  TypeEditCustomers,
  TypeCustomers,
} from "constants/types/customers.type";
import {
  fetchCompaniesList,
  fetchCompaniesTree,
  getAllLoaiDonVi,
} from "pages/Companies/store";
import {
  TypeCompanies,
  TypeEditCompanies,
} from "constants/types/companies.type";
import { companyAPI } from "apis/company";

const Companies = () => {
  useEffect(() => {
    fetchCompaniesList({ q: "" });
    fetchCompaniesTree();
    getAllLoaiDonVi();
  }, []);

  const formFilter = useFormik({
    initialValues: {
      q: "",
      limit: 10,
      page: 1,
    },
    onSubmit: (data: any) => {
      fetchCompaniesList(data);
    },
  });

  const handleChangePage = (page: number, pageSize: number) => {
    const params = {
      ...(formFilter.values as any),
      page,
      limit: pageSize,
    };
    fetchCompaniesList(params);
  };

  // Add Customers
  const [visibleAddCustomers, setVisibleAddCustomers] =
    useState<boolean>(false);
  const [addCustomersError, setAddCustomersError] = useState<string>("");

  const handleSubmitAddCustomers = async (data: TypeEditCompanies) => {
    try {
      await companyAPI.create(data);
      setAddCustomersError("");
      message.success("Thêm mới nhóm người dùng thành công.");
      formFilter.submitForm();
      setVisibleAddCustomers(false);
    } catch (error: any) {
      setAddCustomersError(error.response.data.error.message);
    }
  };

  // Edit Customers
  const [visibleEditCustomers, setVisibleEditCustomers] =
    useState<boolean>(false);
  const [customersSelected, setcustomersSelected] = useState<TypeCompanies>();
  const [editCustomersError, setEditCustomersError] = useState<string>("");
  const handleOpenEditCustomers = (customers: TypeCompanies) => {
    setcustomersSelected(customers);
    setVisibleEditCustomers(true);
  };

  const handleSubmitEditCustomers = async (data: TypeEditCompanies) => {
    try {
      if (!customersSelected) return;
      await companyAPI.update(data);
      setEditCustomersError("");
      message.success("Cập nhật danh mục thành công.");
      formFilter.submitForm();
      setVisibleEditCustomers(false);
    } catch (error: any) {
      setEditCustomersError(error.response.data.error.message);
    }
  };

  // start delete
  const handleConfirmDeleteCustomers = async (id: number) => {
    try {
      await companyAPI.delete(id);
      message.success("Xóa khách hàng thành công");
      const params = {
        ...(formFilter.values as any),
      };
      fetchCompaniesList(params);
    } catch (error: any) {
      message.error(error.response.data.error.message);
    }
  };
  // end delete

  return (
    <>
      <ModalControlCustomers
        visible={visibleAddCustomers}
        onCancel={() => setVisibleAddCustomers(false)}
        onSubmit={handleSubmitAddCustomers}
        okText="Thêm"
        error={addCustomersError}
      />
      <ModalControlCustomers
        visible={visibleEditCustomers}
        onCancel={() => setVisibleEditCustomers(false)}
        customers={customersSelected}
        okText="Cập nhật"
        onSubmit={handleSubmitEditCustomers}
        error={editCustomersError}
      />
      <div>
        <Card>
          <CardTitle title="Đơn vị" subtitle="Thông tin đơn vị" />
          <div>
            <Space>
              <Input
                placeholder="Tìm kiếm theo tên đơn vị"
                suffix={<SearchOutlined />}
                name="q"
                value={formFilter.values.q}
                onChange={formFilter.handleChange}
                allowClear
              />
              <Button type="primary" onClick={formFilter.submitForm}>
                Tìm kiếm
              </Button>
            </Space>
          </div>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setVisibleAddCustomers(true)}
            style={{ marginBottom: 16, float: "right" }}
          >
            Tạo mới
          </Button>

          <TableCustomers
            onChangePage={handleChangePage}
            onClickEditCustomers={handleOpenEditCustomers}
            onConfirmDeleteCustomers={handleConfirmDeleteCustomers}
          />
        </Card>
      </div>
    </>
  );
};

export default Companies;
