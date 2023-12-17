import { request } from "apis/base";

export const chucVuAPI = {
  getAll: () => {
    return request("/ChucVu", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
