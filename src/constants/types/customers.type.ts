import { CommonGetAllParams } from "constants/types/common.type";
import { Invoices } from "./invoices.type";
export type TypeCustomers = {
  id: number;
  name: string;
  phone: string;
  email: string;
  invoices: Array<Invoices>;
};

export type GetCustomers = CommonGetAllParams & {
  name?: string;
  phone?: string;
  email?: string;
};

export type TypeEditCustomers = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type TypeCreateCustomers = {
  id: number;
  name: string;
  phone: string;
  email: string;
};
