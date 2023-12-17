import { request } from "apis/base";

export type ParamsStatistic = {
  donViId?: number;
};

export const statisticApi = {
  getChuyenCanByLevelLower: (params?: ParamsStatistic) => {
    return request("/ThongKe/GetChuyenCanByLevelLower", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getKTDVByLevelLower: (params?: ParamsStatistic) => {
    return request("/ThongKe/GetKTDVByLevelLower", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
