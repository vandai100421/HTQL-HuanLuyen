import { request } from "apis/base";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeEditEquipment } from "constants/types/equipment.type";

export const equipmentAPI = {
  getAll: (params?: CommonGetAllParams) => {
    return request("/TrangThietBi/search", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: TypeEditEquipment) => {
    return request("/TrangThietBi", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (data: TypeEditEquipment) => {
    return request("/TrangThietBi/" + data.id, {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (id: number) => {
    return request("/TrangThietBi/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
