import { TypeCustomers } from "./customers.type";
import { TypeDishType } from "./dishType.type";
import { TypeTable } from "./table.type";

export type TypeCashItem = {
  id: number;
  customers: TypeCustomers;
  user_id: number;
  reservations: TypeTable;
  date: string;
  total_amount: number;
  payment: string;
  getout: string;
  invoice_details: Array<TypeInvoiceItem>;
};

export type TypeInvoiceItem = {
  id: number;
  invoices_id: number;
  dishes: TypeDish;
  quantity: number;
  price: number;
  status: string;
  orderAt: string;
  note: string;
  info: string;
};

export type TypeDish = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  dishtypes: TypeDishType;
  number?: number;
};
