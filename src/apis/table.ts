import { request } from "apis/base";
import { TypeCreateTable, TypeEditTable } from "constants/types/table.type";

export const tableApi = {
  getAll: (params?: any) => {
    return request("/admin/reservations/", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getOne: (tableId: string) => {
    return request("/admin/reservations/" + tableId, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (tableId: number) => {
    return request("/admin/reservations/delete/" + tableId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getSelection: () => {
    return request("/admin/reservations/selection", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: TypeCreateTable) => {
    return request("/admin/reservations/add", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (data: TypeEditTable) => {
    return request("/admin/reservations/update", {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
