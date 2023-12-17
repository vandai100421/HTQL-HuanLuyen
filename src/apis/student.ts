import { request } from "apis/base";
import {
  GetStudentsParams,
  TypeCreateStudents,
} from "constants/types/students.type";

export const studentAPI = {
  getAll: (params?: GetStudentsParams) => {
    return request("/HocVien/search", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: TypeCreateStudents) => {
    return request("/HocVien", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (id: string, data: TypeCreateStudents) => {
    return request("/HocVien/" + id, {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (id: string) => {
    return request("/HocVien/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
