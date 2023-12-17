import { request } from "apis/base";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeEditSchedule } from "constants/types/schedule.type";

export const scheduleApi = {
  getAll: (params?: CommonGetAllParams) => {
    return request("/KHHuanLuyen/searchLevelYourself", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getAllUpper: (params?: CommonGetAllParams) => {
    return request("/KHHuanLuyen/searchLevelUpper", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getAllLower: (params?: CommonGetAllParams) => {
    return request("/KHHuanLuyen/searchLevelLower", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: TypeEditSchedule) => {
    return request("/KHHuanLuyen", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (data: TypeEditSchedule) => {
    return request("/KHHuanLuyen/" + data.id, {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (id: number) => {
    return request("/KHHuanLuyen/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
