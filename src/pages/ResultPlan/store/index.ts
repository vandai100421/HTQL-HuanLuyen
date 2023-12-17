import { createState } from "@hookstate/core";
import { followPlanApi } from "apis/followPlan";
import { resultPlanApi } from "apis/resultPlan";
import { ParamsGetAllResultPlan } from "constants/types/resultPlan.type";

type resultState = {
  id: number;
  resultPlans: Array<any>;
  limit?: number;
  page?: number;
  keHoachId?: number;
  total: number;
  isLoading: boolean;
};

const initialState: resultState = {
  id: 0,
  resultPlans: [],
  limit: 10,
  page: 1,
  total: 0,
  isLoading: true,
};

const resultPlanStore = createState(initialState);

export const getAllResultPlan = async (params?: ParamsGetAllResultPlan) => {
  try {
    resultPlanStore.isLoading.set(true);

    const dataRes = await resultPlanApi.getListKQ(params);

    resultPlanStore.merge({
      resultPlans: dataRes.data.data,
      page: dataRes.data.page,
      limit: dataRes.data.limit,
      total: dataRes.data.total,
      isLoading: false,
    });
  } catch (error) {
    resultPlanStore.isLoading.set(false);
  }
};

export default resultPlanStore;
