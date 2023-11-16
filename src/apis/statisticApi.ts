import { request } from "apis/base";

export const statisticApi = {
  getTotalCustomers: () => {
    return request("admin/statistics/customerNumbers", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getDishesFrequency: () => {
    return request("admin/statistics/DishesFrequency", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getTodayRevenue: () => {
    return request("admin/statistics/todayRevenue", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getStaffFrequency: () => {
    return request("admin/statistics/StaffFrequency", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
