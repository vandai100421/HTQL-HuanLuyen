import { request } from "apis/base";

export type ParamsStatistic = {
  keHoachId?: number;
  id?: number;
};

export const statisticApi = {
  getChuyenCanByLevelYourself: (params?: ParamsStatistic) => {
    return request("/ThongKe/GetChuyenCanByLevelYourself", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getChuyenCanByLevelLower: (params: ParamsStatistic) => {
    return request("/ThongKe/GetChuyenCanByLevelLower/" + params.id, {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getKTLevelYourself: (params: ParamsStatistic) => {
    return request("/ThongKe/GetKTLevelYourself/" + params.id, {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getKTLevelLower: (params: ParamsStatistic) => {
    return request("/ThongKe/GetKTLevelLower/" + params.id, {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getKTDVByLevelLower: (params: ParamsStatistic) => {
    return request("/ThongKe/GetKTDVByLevelLower/" + params.id, {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
