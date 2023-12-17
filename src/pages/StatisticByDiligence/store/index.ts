import { createState } from "@hookstate/core";
import { message } from "antd";
import { ParamsStatistic, statisticApi } from "apis/statisticApi";
import { CommonGetAllParams } from "constants/types/common.type";

type scheduleState = {
  ccData: Array<any>; // chuyên cần
  dvData: Array<any>; // đơn vị
  isLoading: boolean;
};

const initialState: scheduleState = {
  ccData: [],
  dvData: [],
  isLoading: true,
};

const statisicStore = createState(initialState);

export const getChuyenCanByLevelLower = async (params?: ParamsStatistic) => {
  try {
    statisicStore.isLoading.set(true);
    const dataRes = await statisticApi.getChuyenCanByLevelLower(params);

    statisicStore.merge({
      ccData: dataRes.data.data,
      isLoading: false,
    });
  } catch (error) {
    statisicStore.isLoading.set(false);
    message.error("Lỗi khi lấy dữ liệu thống kê.");
  }
};

export const getKTDVByLevelLower = async (params?: ParamsStatistic) => {
  try {
    statisicStore.isLoading.set(true);
    const dataRes = await statisticApi.getKTDVByLevelLower(params);

    statisicStore.merge({
      dvData: dataRes.data.data,
      isLoading: false,
    });
  } catch (error) {
    statisicStore.isLoading.set(false);
    message.error("Lỗi khi lấy dữ liệu thống kê.");
  }
};

export default statisicStore;
