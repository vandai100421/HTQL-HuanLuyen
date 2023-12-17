import { createState, useHookstate } from "@hookstate/core";
import { message } from "antd";
import { scheduleApi } from "apis/schedule";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeSchedule } from "constants/types/schedule.type";
import followPlanStore from "pages/FollowPlans/store";

type scheduleState = {
  schedules: Array<TypeSchedule>;
  schedulesUpper: Array<TypeSchedule>;
  schedulesLower: Array<TypeSchedule>;
  limit: number;
  page: number;
  total: number;
  isLoadingGetAllSchedule: boolean;
};

const initialState: scheduleState = {
  schedules: [],
  schedulesUpper: [],
  schedulesLower: [],
  limit: 10,
  page: 1,
  total: 0,
  isLoadingGetAllSchedule: true,
};

const scheduleStore = createState(initialState);
export const getAllSchedule = async (params?: CommonGetAllParams) => {
  try {
    scheduleStore.isLoadingGetAllSchedule.set(true);
    const _params = {
      ...params,
      page: params?.page ? params.page : scheduleStore.page.get(),
      limit: params?.limit ? params.limit : scheduleStore.limit.get(),
    };
    const dataRes = await scheduleApi.getAll(_params);
    scheduleStore.merge({
      schedules: dataRes.data.data,
      page: dataRes.data.page,
      total: dataRes.data.total,
      limit: dataRes.data.limit,
      isLoadingGetAllSchedule: false,
    });
  } catch (error) {
    scheduleStore.isLoadingGetAllSchedule.set(false);
    message.error("Lỗi khi lấy danh sách kế hoạch huấn luyện.");
  }
};

export const getAllScheduleUpper = async (params?: CommonGetAllParams) => {
  try {
    scheduleStore.isLoadingGetAllSchedule.set(true);
    const _params = {
      ...params,
      page: params?.page ? params.page : scheduleStore.page.get(),
      limit: params?.limit ? params.limit : scheduleStore.limit.get(),
    };
    const dataRes = await scheduleApi.getAllUpper(_params);

    scheduleStore.merge({
      schedulesUpper: dataRes.data.data,
      page: dataRes.data.page,
      total: dataRes.data.total,
      limit: dataRes.data.limit,
      isLoadingGetAllSchedule: false,
    });
  } catch (error) {
    scheduleStore.isLoadingGetAllSchedule.set(false);
    message.error("Lỗi khi lấy danh sách kế hoạch huấn luyện.");
  }
};

export const getAllScheduleLower = async (params?: CommonGetAllParams) => {
  try {
    scheduleStore.isLoadingGetAllSchedule.set(true);
    const _params = {
      ...params,
      page: params?.page ? params.page : scheduleStore.page.get(),
      limit: params?.limit ? params.limit : scheduleStore.limit.get(),
    };
    const dataRes = await scheduleApi.getAllLower(_params);

    scheduleStore.merge({
      schedulesLower: dataRes.data.data,
      page: dataRes.data.page,
      total: dataRes.data.total,
      limit: dataRes.data.limit,
      isLoadingGetAllSchedule: false,
    });
  } catch (error) {
    scheduleStore.isLoadingGetAllSchedule.set(false);
    message.error("Lỗi khi lấy danh sách kế hoạch huấn luyện.");
  }
};

export default scheduleStore;
