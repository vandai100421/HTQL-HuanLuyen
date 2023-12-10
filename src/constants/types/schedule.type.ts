import { UploadFile } from "antd/lib/upload/interface";

export type TypeSchedule = {
  id: number;
  tenKeHoach: string;
  link: string;
  nguoiGui: number;
  tenNguoiGui: string;
};

export type TypeEditSchedule = {
  id: number;
  tenKeHoach: string;
  link: Array<UploadFile>;
  nguoiGui: number;
  donViIds: Array<string>;
};
