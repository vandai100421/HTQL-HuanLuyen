import { request } from "apis/base";

export const capBacAPI = {
  getAll: () => {
    return request("/CapBac", {
      method: "GET",
    });
  },
};
