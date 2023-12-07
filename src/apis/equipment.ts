import { request } from "apis/base";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeEditEquipment } from "constants/types/equipment.type";

export const equipmentAPI = {
  getAll: (params?: CommonGetAllParams) => {
    return request("/TrangThietBi/search", {
      method: "GET",
      params,
    });
  },
  create: (data: TypeEditEquipment) => {
    return request("/TrangThietBi", {
      method: "POST",
      data,
    });
  },
  update: (data: TypeEditEquipment) => {
    return request("/TrangThietBi/" + data.id, {
      method: "PUT",
      data,
    });
  },
  delete: (id: number) => {
    return request("/TrangThietBi/" + id, {
      method: "DELETE",
    });
  },
};
