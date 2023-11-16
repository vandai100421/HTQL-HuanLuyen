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
import customersStore, { fetchCustomersList } from "pages/Customers/store";
import { useHookstate } from "@hookstate/core";

const Customers = () => {
  const customersState = useHookstate(customersStore);

  useEffect(() => {
    fetchCustomersList();
  }, []);

  const formFilter = useFormik({
    initialValues: {
      name: "",
      status: "all",
      start_time: null,
      end_time: null,
    },
    onSubmit: (data: any) => {
      fetchCustomersList(data);
    },
  });

  const handleChangePage = (page: number, pageSize: number) => {
    const params = {
      ...(formFilter.values as any),
      page,
      limit: pageSize,
    };
    fetchCustomersList(params);
  };

  // Add Customers
  const [visibleAddCustomers, setVisibleAddCustomers] =
    useState<boolean>(false);
  const [addCustomersError, setAddCustomersError] = useState<string>("");

  const handleSubmitAddCustomers = async (data: TypeCreateCustomers) => {
    try {
      // await customersApi.create(data);
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
  const [customersSelected, setcustomersSelected] = useState<TypeCustomers>();
  const [editCustomersError, setEditCustomersError] = useState<string>("");
  const handleOpenEditCustomers = (customers: TypeCustomers) => {
    setcustomersSelected(customers);
    setVisibleEditCustomers(true);
  };

  const handleSubmitEditCustomers = async (data: TypeEditCustomers) => {
    try {
      if (!customersSelected) return;
      // await customersApi.update(data);
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
      // await customersApi.delete(id);
      message.success("Xóa khách hàng thành công");
      const params = {
        ...(formFilter.values as any),
      };
      fetchCustomersList(params);
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
          <CardTitle
            title="Khách hàng"
            subtitle="Thông tin chi tiết khách hàng"
          />
          <div>
            <Space>
              <Input
                placeholder=" Tên khách hàng "
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
              onClick={() => setVisibleAddCustomers(true)}
              style={{ marginBottom: 16, float: "right" }}
            >
              Tạo mới
            </Button>
          )}

          <TableCustomers
            // customerss={customersState.customerss.get()}
            onChangePage={handleChangePage}
            onClickEditCustomers={handleOpenEditCustomers}
            onConfirmDeleteCustomers={handleConfirmDeleteCustomers}
          />
        </Card>
      </div>
    </>
  );
};

export default Customers;
