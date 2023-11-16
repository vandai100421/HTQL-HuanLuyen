import { request } from "apis/base";
import {
  CreateUserData,
  EditUserData,
  GetUsersParams,
} from "constants/types/user.type";

export const userApi = {
  getAll: (params?: GetUsersParams) => {
    return request("/admin/users/", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (userId: string) => {
    return request("/admin/users/delete/" + userId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: CreateUserData) => {
    return request("/admin/users/add", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (data: EditUserData) => {
    return request("/admin/users/update", {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
