import { CommonGetAllParams } from "constants/types/common.type";
import { TypePermission } from "constants/types/permission.type";

export type PermissionRole = {
  _id: string;
  permission_id: string;
  role_id: string;
  created_at: string;
  updated_at: string;
  permission_name?: string;
  permission_code?: string;
  permission: TypePermission;
};

export type GetAllPermissionRoleParams = CommonGetAllParams & {
  role_id?: string;
};

export type CreatePermissionRoleData = {
  permission_ids: Array<string>;
  role_id: string;
};
