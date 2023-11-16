import { createState } from "@hookstate/core";
import permissionApi from "apis/permission";
import {
  GetPermissionsParams,
  TypePermission,
} from "constants/types/permission.type";

type PermissionsState = {
  permissions: Array<TypePermission>;
  // limit: number;
  // page: number;
  // total: number;
  isLoadingGetAllPermission: boolean;
};

const initialState: PermissionsState = {
  permissions: [],
  // limit: 10,
  // page: 1,
  // total: 0,
  isLoadingGetAllPermission: true,
};

const permissionStore = createState(initialState);

export const fetchPermissionList = async (params?: GetPermissionsParams) => {
  try {
    permissionStore.isLoadingGetAllPermission.set(true);
    const _params = {
      ...params,
      // page: params?.page ? params.page : permissionStore.page.get(),
      // limit: params?.limit ? params.limit : permissionStore.limit.get(),
    };
    const dataRes = await permissionApi.getAll(_params);

    permissionStore.set({
      permissions: dataRes.data,
      // page: dataRes.data.result.page,
      // limit: dataRes.data.result.limit,
      // total: dataRes.data.result.totalDocs,
      isLoadingGetAllPermission: false,
    });
  } catch (error) {
    permissionStore.isLoadingGetAllPermission.set(false);
  }
};

export default permissionStore;
