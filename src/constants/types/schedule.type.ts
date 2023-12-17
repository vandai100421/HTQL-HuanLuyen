import { UploadFile } from "antd/lib/upload/interface";

export type TypeSchedule = {
  daTaoBH: number;
  daTaoKQ: number;
  id: number;
  tenKeHoach: string;
  link: string;
  nguoiGui: number;
  tenNguoiGui: string;
  noiDung: string;
  donViId: number;
  soBuoiHoc: number;
  soTiet: number;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
};

export type TypeEditSchedule = {
  id: number;
  maKeHoach: string;
  tenKeHoach: string;
  link: Array<UploadFile>;
  noiDung: string;
  donViId: number;
  soBuoiHoc: number;
  soTiet: number;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
};
