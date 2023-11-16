import { CommonGetAllParams } from "constants/types/common.type";
import { TypePermission } from "constants/types/permission.type";

export type GetRolesParams = CommonGetAllParams & {
  name?: string;
  code?: string;
  status?: string;
  start_time?: string;
  end_time?: string;
};

export type Role = {
  _id: string;
  id: number;
  name: string;
  description: string;
  action: string;
  code: string;
  status: string;
  is_default: boolean;
  user_created: string;
  user_updated: string;
  created_at: string;
  updated_at: string;
  permissions: Array<TypePermission>;
};

export type CreateRoleData = {
  name: string;
  description: string;
  action: string;
};

export type EditRoleData = {
  id: number;
  name: string;
  action: string;
  description: string;
};
