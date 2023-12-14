import { createState } from "@hookstate/core";
import { message } from "antd";
import { scheduleApi } from "apis/schedule";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeSchedule } from "constants/types/schedule.type";

type permissionState = {
  permissions: Array<TypeSchedule>;
  limit: number;
  page: number;
  total: number;
  isLoading: boolean;
};

const initialState: permissionState = {
  permissions: [],
  limit: 10,
  page: 1,
  total: 0,
  isLoading: true,
};

const permissionStore = createState(initialState);

export const getAllPermission = async (params?: CommonGetAllParams) => {
  try {
    permissionStore.isLoading.set(true);
    const _params = {
      ...params,
      page: params?.page ? params.page : permissionStore.page.get(),
      limit: params?.limit ? params.limit : permissionStore.limit.get(),
    };
    const dataRes = await scheduleApi.getAll(_params);

    permissionStore.set({
      permissions: dataRes.data.data,
      page: dataRes.data.page,
      total: dataRes.data.total,
      limit: dataRes.data.limit,
      isLoading: false,
    });
  } catch (error) {
    permissionStore.isLoading.set(false);
    message.error("Lỗi khi lấy danh sách quyền.");
  }
};

export default permissionStore;
