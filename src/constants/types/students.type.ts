import { CommonGetAllParams } from "constants/types/common.type";
export type TypeStudents = {
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: number;
  donViId: number;
  queQuan: string;
  soDienThoai: string;
};

export type GetStudentsParams = CommonGetAllParams & {
  tenHocVien?: string;
};

export type TypeEditStudents = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type TypeCreateStudents = {
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: number;
  donViId: number;
  queQuan: string;
  soDienThoai: string;
};
