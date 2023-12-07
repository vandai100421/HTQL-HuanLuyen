export type TypeUser = {
  id: number;
  tenNguoiDung: string;
  hoTen: string;
  email: string;
  vaiTro: number;
  donViId: number;
  matKhau: string;
};

export type TypeEditUser = {
  id: number;
  tenNguoiDung: string;
  hoTen: string;
  email: string;
  matKhau: string;
  vaiTro: number;
  donViId: number;
  confirmMatKhau: string;
};
