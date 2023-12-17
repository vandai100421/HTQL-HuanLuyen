import { CommonGetAllParams } from "constants/types/common.type";
export type TypeCompanies = {
  id: number;
  tenDonVi: string;
  ngayThanhLap: string;
  ngayGiaiTan: string;
  donViId: number;
  loaiDonViId: number;
  capDonViId: number;
  trangThai: number;
};

export type GetCompaniesParams = CommonGetAllParams & {
  q?: string;
};

export type TypeEditCompanies = {
  id: number;
  tenDonVi: string;
  ngayThanhLap: string;
  ngayGiaiTan: string;
  donViId: number;
  loaiDonViId: number;
  capDonViId: number;
  trangThai: number;
};

export type TypeLoaiDonVi = {
  id: number;
  tenLoaiDv: string;
};
