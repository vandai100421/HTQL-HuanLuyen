import { createState } from "@hookstate/core";
import { ParamsGetAllFollowPlan } from "constants/types/followPlan.type";
import { followPlanApi } from "apis/followPlan";

export interface TypeItemFollowPlan {
  buoiHocId: number;
  coMat: number;
  donViId: number;
  hocVienId: number;
  id: number;
  tenHocVien: string;
};

type followPlanState = {
  id: number;
  followPlans: Array<TypeItemFollowPlan>;
  limit?: number;
  page?: number;
  keHoachId?: number;
  soBuoiHoc: number;
  total: number;
  isLoading: boolean;
};

const initialState: followPlanState = {
  id: 0,
  followPlans: [],
  limit: 10,
  soBuoiHoc: 0,
  page: 1,
  total: 0,
  isLoading: true,
};

const followPlanStore = createState(initialState);

export const getAllFollowPlan = async () => {
  try {
    followPlanStore.isLoading.set(true);

    const dataRes = await followPlanApi.getListDD(followPlanStore.value.id);

    followPlanStore.merge({
      followPlans: dataRes.data.data.detail,
      soBuoiHoc: dataRes.data.data.soBuoiHoc,
      page: dataRes.data.page,
      limit: dataRes.data.limit,
      total: dataRes.data.total,
      isLoading: false,
    });
  } catch (error) {
    followPlanStore.isLoading.set(false);
  }
};

export default followPlanStore;
