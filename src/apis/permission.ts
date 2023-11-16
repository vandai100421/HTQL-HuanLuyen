import {
  TypeCreatePermission,
  TypeEditPermission,
} from "constants/types/permission.type";
import { request } from "apis/base";

const permissionApi = {
  getAll: (params: any) => {
    return request("/admin/permissions/", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  getDetail: (permissionId: string) => {
    return request(`/admin/permissions/${permissionId}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  create: (data: TypeCreatePermission) => {
    return request("/admin/permissions/add", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  update: (data: TypeEditPermission) => {
    return request("/admin/permissions/update", {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (id: number) => {
    return request(`/admin/permissions/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};

export default permissionApi;
