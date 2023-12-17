import { CommonGetAllParams } from "./common.type";

export type ParamsGetAllFollowPlan = CommonGetAllParams & {
  keHoachId?: number;
};

export type TypeItemUpdateFollowPlan = {
  hocVienId: number;
  buoiHocId: number;
  coMat: number;
};

export type TypeUpdateFollowPlan = {
  keHoachId: number;
  details: Array<TypeItemUpdateFollowPlan>;
};
