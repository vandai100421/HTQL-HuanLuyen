import { CommonGetAllParams } from "constants/types/common.type";

export type GetUsersParams = CommonGetAllParams & {
  last_name?: string;
  email?: string;
  phone?: string;
  status?: string;
  end_time?: number;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  position: string;
  salary: number;
  group_id: number;
  status: string;
};

export type CreateUserData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  position: string;
  salary: number;
  group_id: number;
  status: string;
};

export type EditUserData = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  position: string;
  salary: number;
  group_id: number;
  status: string;
};
