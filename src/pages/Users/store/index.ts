import { createState } from "@hookstate/core";
import { message } from "antd";
import { userApi } from "apis/user";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeUser } from "constants/types/user.type";

type userState = {
  users: Array<TypeUser>;
  limit: number;
  page: number;
  total: number;
  isLoadingGetAllUser: boolean;
};

const initialState: userState = {
  users: [],
  limit: 10,
  page: 1,
  total: 0,
  isLoadingGetAllUser: true,
};

const userStore = createState(initialState);

export const getAllUser = async (params?: CommonGetAllParams) => {
  try {
    userStore.isLoadingGetAllUser.set(true);
    const _params = {
      ...params,
      page: params?.page ? params.page : userStore.page.get(),
      limit: params?.limit ? params.limit : userStore.limit.get(),
    };
    const dataRes = await userApi.getAll(_params);

    userStore.set({
      users: dataRes.data.data,
      page: dataRes.data.page,
      total: dataRes.data.total,
      limit: dataRes.data.limit,
      isLoadingGetAllUser: false,
    });
  } catch (error) {
    userStore.isLoadingGetAllUser.set(false);
    message.error("Lỗi khi lấy danh sách trang thiết bị.");
  }
};

export default userStore;
