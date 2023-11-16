import { CommonGetAllParams } from "constants/types/common.type";
import { type } from "os";
import { Invoices } from "./invoices.type";
export type TypeTable = {
  id: number;
  name: string;
  num_people: number;
  status: string;
  customers_id: number;
  invoices: Array<Invoices>;
};

export type GetTable = CommonGetAllParams & {
  name?: string;
  status?: string;
};

export type TypeEditTable = {
  id: number;
  name: string;
  num_people: number;
  status: string;
  custormers_id: number;
};

export type TypeCreateTable = {
  id: number;
  name: string;
  num_people: number;
  status: string;
  customers_id: number;
};
