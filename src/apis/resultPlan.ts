import { request } from "apis/base";
import { ParamsGetAllResultPlan, TypeUpdateResultPlan } from "constants/types/resultPlan.type";

export const resultPlanApi = {
  getListKQ: (params?: ParamsGetAllResultPlan) => {
    return request("/KetQuaHL/search", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  updateListKQ: (data: TypeUpdateResultPlan) => {
    return request("/KetQuaHL", {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  createKQ: (id: number) => {
    return request("/KetQuaHL/CreateByKHId/" + id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
