import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Space } from "antd";
import CardTitle from "components/CardTitle";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import TableTable from "./subcomponents/TableTable";
import ModalControlTable from "./subcomponents/ModalControlTable";
import {
  TypeCreateTable,
  TypeEditTable,
  TypeTable,
} from "constants/types/table.type";
import tableStore, { fetchTableList } from "pages/Table/store";
import { tableApi } from "apis/table";
import { useHookstate } from "@hookstate/core";

const Table = () => {
  const tableState = useHookstate(tableStore);

  useEffect(() => {
    fetchTableList();
  }, []);

  const formFilter = useFormik({
    initialValues: {
      name: "",
      status: "all",
      start_time: null,
      end_time: null,
    },
    onSubmit: (data: any) => {
      fetchTableList(data);
    },
  });

  const handleChangePage = (page: number, pageSize: number) => {
    const params = {
      ...(formFilter.values as any),
      page,
      limit: pageSize,
    };
    fetchTableList(params);
  };

  // Add Table
  const [visibleAddTable, setVisibleAddTable] = useState<boolean>(false);
  const [addTableError, setAddTableError] = useState<string>("");

  const handleSubmitAddTable = async (data: TypeCreateTable) => {
    try {
      await tableApi.create(data);
      setAddTableError("");
      message.success("Thêm mới nhóm người dùng thành công.");
      formFilter.submitForm();
      setVisibleAddTable(false);
    } catch (error: any) {
      setAddTableError(error.response.data.error.message);
    }
  };

  // Edit Table
  const [visibleEditTable, setVisibleEditTable] = useState<boolean>(false);
  const [tableSelected, settableSelected] = useState<TypeTable>();
  const [editTableError, setEditTableError] = useState<string>("");
  const handleOpenEditTable = (table: TypeTable) => {
    settableSelected(table);
    setVisibleEditTable(true);
  };

  const handleSubmitEditTable = async (data: TypeEditTable) => {
    try {
      if (!tableSelected) return;
      await tableApi.update(data);
      setEditTableError("");
      message.success("Cập nhật danh mục thành công.");
      formFilter.submitForm();
      setVisibleEditTable(false);
    } catch (error: any) {
      setEditTableError(error.response.data.error.message);
    }
  };

  // start delete
  const handleConfirmDeleteTable = async (id: number) => {
    try {
      await tableApi.delete(id);
      message.success("Xóa danh mục thành công");
      const params = {
        ...(formFilter.values as any),
      };
      fetchTableList(params);
    } catch (error: any) {
      message.error(error.response.data.error.message);
    }
  };
  // end delete

  return (
    <>
      <ModalControlTable
        visible={visibleAddTable}
        onCancel={() => setVisibleAddTable(false)}
        onSubmit={handleSubmitAddTable}
        okText="Thêm"
        error={addTableError}
      />
      <ModalControlTable
        visible={visibleEditTable}
        onCancel={() => setVisibleEditTable(false)}
        table={tableSelected}
        okText="Cập nhật"
        onSubmit={handleSubmitEditTable}
        error={editTableError}
      />
      <div>
        <Card>
          <CardTitle title="Bàn" subtitle="Thông tin chi tiết các bàn" />
          <div>
            <Space>
              <Input
                placeholder=" Tên bàn "
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
              onClick={() => setVisibleAddTable(true)}
              style={{ marginBottom: 16, float: "right" }}
            >
              Tạo mới
            </Button>
          )}

          <TableTable
            // tables={tableState.tables.get()}
            onChangePage={handleChangePage}
            onClickEditTable={handleOpenEditTable}
            onConfirmDeleteTable={handleConfirmDeleteTable}
          />
        </Card>
      </div>
    </>
  );
};

export default Table;
