import { CommonGetAllParams } from "constants/types/common.type";
export type TypeStudents = {
  id: string;
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: number;
  donViId: number;
  queQuan: string;
  soDienThoai: string;
  capBacId: number;
  chucVuId: number;
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
  id: string;
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: number;
  donViId: number;
  queQuan: string;
  soDienThoai: string;
  capBacId: number;
  chucVuId: number;
};
