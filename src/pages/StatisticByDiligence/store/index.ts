import { createState } from "@hookstate/core";
import { message } from "antd";
import { ParamsStatistic, statisticApi } from "apis/statisticApi";
import { CommonGetAllParams } from "constants/types/common.type";

type scheduleState = {
  ccData: Array<any>; // chuyên cần
  isLoading: boolean;
};

const initialState: scheduleState = {
  ccData: [],
  isLoading: true,
};

const statisicStore = createState(initialState);

export const getChuyenCanByLevelLower = async (params?: ParamsStatistic) => {
  try {
    statisicStore.isLoading.set(true);
    const dataRes = await statisticApi.getChuyenCanByLevelLower(params);

    statisicStore.set({
      ccData: dataRes.data.data,
      isLoading: false,
    });
  } catch (error) {
    statisicStore.isLoading.set(false);
    message.error("Lỗi khi lấy danh sách kế hoạch huấn luyện.");
  }
};

export default statisicStore;
