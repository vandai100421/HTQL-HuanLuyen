import { CommonGetAllParams } from "constants/types/common.type";
import { Dish } from "./dishes.type";
export type TypeDishType = {
  id: number;
  name: string;
};

export type TypeCreateDishType = {
  id: number;
  name: string;
  description: string;
};

export type TypeEditDishType = {
  id: number;
  name: string;
};

export type GetDishTypesParams = CommonGetAllParams & {
  name?: string;
  code?: string;
  status?: string;
  start_time?: string;
  end_time?: string;
};
