import { request } from "apis/base";
import {
  CreateRoleData,
  EditRoleData,
  GetRolesParams,
} from "constants/types/role.type";

export const roleApi = {
  getAll: (params?: GetRolesParams) => {
    return request("/admin/permissionGroups/", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getOne: (roleId: string) => {
    return request("/admin/permissionGroups/" + roleId, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (roleId: number) => {
    return request("/admin/permissionGroups/delete/" + roleId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getSelection: () => {
    return request("/admin/roles/selection", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: CreateRoleData) => {
    return request("/admin/permissionGroups/add", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (data: EditRoleData) => {
    return request("/admin/permissionGroups/update", {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
