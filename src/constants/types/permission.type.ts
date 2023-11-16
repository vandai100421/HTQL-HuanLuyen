import { CommonGetAllParams } from "constants/types/common.type";

export type GetPermissionsParams = CommonGetAllParams & {
  name?: string;
  description?: string;
  group?: string;
};

export type TypePermission = {
  id: number;
  name: string;
  description: string;
};

export type TypeEditPermission = {
  id: number;
  name: string;
  description: string;
};

export type TypeCreatePermission = {
  name: string;
  description: string;
};
