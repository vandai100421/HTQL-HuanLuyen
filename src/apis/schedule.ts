import { request } from "apis/base";
import { CommonGetAllParams } from "constants/types/common.type";

export const scheduleApi = {
  getAll: (params?: CommonGetAllParams) => {
    return request("/KHHuanLuyen/getOfUser", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: FormData) => {
    return request("/KHHuanLuyen", {
      method: "POST",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update: (data: FormData) => {
    return request("/KHHuanLuyen/" + data.get("id"), {
      method: "PUT",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete: (id: number) => {
    return request("/KHHuanLuyen/" + id, {
      method: "DELETE",
    });
  },
};
