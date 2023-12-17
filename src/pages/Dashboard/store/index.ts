import { hookstate } from "@hookstate/core";
import { message } from "antd";
import { ParamsStatistic, statisticApi } from "apis/statisticApi";
import { TypeDish } from "constants/types/cash.type";
import { TypeUser } from "constants/types/user.type";

type TypeDashBoardState = {
  customerNum: number;
  topDishes: Array<TypeDish>;
  today_revenue: number;
  staffFrequency: Array<TypeUser>;
};

const initialValues: TypeDashBoardState = {
  customerNum: 0,
  today_revenue: 0,
  staffFrequency: [],
  topDishes: [],
};

const dashBoardStore = hookstate(initialValues);
export default dashBoardStore;

export const getTotalCustomers = async () => {
  try {
    const dataRes = await statisticApi.getChuyenCanByLevelLower();
  } catch (error) {
    message.error("Lối khi lấy thông tin tổng số khách hàng trong ngày");
  }
};
export const getTodayRevenue = async () => {
  try {
    const dataRes = await statisticApi.getChuyenCanByLevelLower();
  } catch (error) {
    message.error("Lối khi lấy thông tin tổng doanh thu trong ngày");
  }
};

export const getDishesFrequency = async () => {
  try {
    const dataRes = await statisticApi.getChuyenCanByLevelLower();
  } catch (error) {
    message.error("Lối khi lấy thông tin tổng doanh thu trong ngày");
  }
};

export const getStaffFrequency = async () => {
  try {
    const dataRes = await statisticApi.getChuyenCanByLevelLower();
  } catch (error) {
    message.error("Lối khi lấy thông tin tổng doanh thu trong ngày");
  }
};
