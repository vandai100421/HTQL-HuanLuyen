import { hookstate } from "@hookstate/core";
import { message } from "antd";
import { statisticApi } from "apis/statisticApi";
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
    const dataRes = await statisticApi.getTotalCustomers();
    dashBoardStore.customerNum.set(dataRes.data.customerNum);
  } catch (error) {
    message.error("Lối khi lấy thông tin tổng số khách hàng trong ngày");
  }
};
export const getTodayRevenue = async () => {
  try {
    const dataRes = await statisticApi.getTodayRevenue();
    dashBoardStore.today_revenue.set(dataRes.data.today_revenue);
  } catch (error) {
    message.error("Lối khi lấy thông tin tổng doanh thu trong ngày");
  }
};

export const getDishesFrequency = async () => {
  try {
    const dataRes = await statisticApi.getDishesFrequency();
    const _data = dataRes.data.slice(0, 5);
    dashBoardStore.topDishes.set(_data);
  } catch (error) {
    message.error("Lối khi lấy thông tin tổng doanh thu trong ngày");
  }
};

export const getStaffFrequency = async () => {
  try {
    const dataRes = await statisticApi.getStaffFrequency();
    console.log(dataRes.data);

    //   dashBoardStore.topDishes.set(dataRes.data.today_revenue);
  } catch (error) {
    message.error("Lối khi lấy thông tin tổng doanh thu trong ngày");
  }
};
