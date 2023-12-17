import { CommonGetAllParams } from "./common.type";

export type ParamsGetAllResultPlan = CommonGetAllParams & {
  keHoachId?: number;
};

export type TypeItemUpdateResultPlan = {
  ketQuaId: number;
  ketQua: number;
};

export type TypeUpdateResultPlan = {
  keHoachId: number;
  details: Array<TypeItemUpdateResultPlan>;
};
