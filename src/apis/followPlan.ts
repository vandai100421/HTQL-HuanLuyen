import { request } from "apis/base";
import {
  TypeUpdateFollowPlan,
} from "constants/types/followPlan.type";

export const followPlanApi = {
  getListDD: (id: number) => {
    return request("/BH_HV/GetAllByKHId/" + id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  updateListDD: (data: TypeUpdateFollowPlan) => {
    return request("/BH_HV", {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  createBuoiHoc: (id: number) => {
    return request("/BuoiHoc/CreateByKHId/" + id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
