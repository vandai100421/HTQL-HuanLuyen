import { request } from "apis/base";

export const cashApi = {
  getAll: () => {
    return request("/admin/cash/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
