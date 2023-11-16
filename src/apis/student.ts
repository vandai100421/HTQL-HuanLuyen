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
    });
  },
  create: (data: TypeCreateStudents) => {
    return request("/HocVien/", {
      method: "POST",
      data,
    });
  },
};
