import { request } from "apis/base";

export const capBacAPI = {
  getAll: () => {
    return request("/CapBac", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
