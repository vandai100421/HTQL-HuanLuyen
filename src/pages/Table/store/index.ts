import { createState } from "@hookstate/core";
import { tableApi } from "apis/table";
import { GetTable, TypeTable } from "constants/types/table.type";

type TableState = {
  tables: Array<TypeTable>;
  // limit: number;
  // page: number;
  // total: number;
  isLoadingGetAllTable: boolean;
};

const initialState: TableState = {
  tables: [],
  // limit: 10,
  // page: 1,
  // total: 0,
  isLoadingGetAllTable: true,
};

const tableStore = createState(initialState);

export const fetchTableList = async (params?: GetTable) => {
  try {
    tableStore.isLoadingGetAllTable.set(true);
    const _params = {
      ...params,
      // page: params?.page ? params.page : tableStore.page.get(),
      // limit: params?.limit ? params.limit : tableStore.limit.get(),
    };
    const dataRes = await tableApi.getAll(_params);

    tableStore.set({
      tables: dataRes.data,
      // page: dataRes.data.result.page,
      // limit: dataRes.data.result.limit,
      // total: dataRes.data.result.totalDocs,
      isLoadingGetAllTable: false,
    });
  } catch (error) {
    tableStore.isLoadingGetAllTable.set(false);
  }
};

export default tableStore;
