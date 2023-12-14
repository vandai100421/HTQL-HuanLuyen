import { createState } from "@hookstate/core";
import { message } from "antd";
import { scheduleApi } from "apis/schedule";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeSchedule } from "constants/types/schedule.type";

type roleState = {
  roles: Array<TypeSchedule>;
  limit: number;
  page: number;
  total: number;
  isLoading: boolean;
};

const initialState: roleState = {
  roles: [],
  limit: 10,
  page: 1,
  total: 0,
  isLoading: true,
};

const roleStore = createState(initialState);

export const getAllRole = async (params?: CommonGetAllParams) => {
  try {
    roleStore.isLoading.set(true);
    const _params = {
      ...params,
      page: params?.page ? params.page : roleStore.page.get(),
      limit: params?.limit ? params.limit : roleStore.limit.get(),
    };
    const dataRes = await scheduleApi.getAll(_params);

    roleStore.set({
      roles: dataRes.data.data,
      page: dataRes.data.page,
      total: dataRes.data.total,
      limit: dataRes.data.limit,
      isLoading: false,
    });
  } catch (error) {
    roleStore.isLoading.set(false);
    message.error("Lỗi khi lấy danh sách nhóm người dùng.");
  }
};

export default roleStore;
