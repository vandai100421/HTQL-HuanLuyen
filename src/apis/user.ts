import { request } from "apis/base";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeEditUser } from "constants/types/user.type";

export const userApi = {
  getAll: (params?: CommonGetAllParams) => {
    return request("/NguoiDung/search", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: TypeEditUser) => {
    return request("/NguoiDung", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (data: TypeEditUser) => {
    return request("/NguoiDung/" + data.id, {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (id: number) => {
    return request("/NguoiDung/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
