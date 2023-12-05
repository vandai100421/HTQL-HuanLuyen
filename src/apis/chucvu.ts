import { request } from "apis/base";

export const chucVuAPI = {
  getAll: () => {
    return request("/ChucVu", {
      method: "GET",
    });
  },
};
