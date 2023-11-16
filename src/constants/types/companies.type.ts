import { CommonGetAllParams } from "constants/types/common.type";
export type TypeCompanies = {
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: number;
  donViId: number;
  queQuan: string;
  soDienThoai: string;
};

export type GetCompaniesParams = CommonGetAllParams & {
  q?: string;
};

export type TypeEditCompanies = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type TypeCreateCompanies = {
  id: number;
  name: string;
  phone: string;
  email: string;
};
