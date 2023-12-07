import { createState } from "@hookstate/core";
import { message } from "antd";
import { equipmentAPI } from "apis/equipment";
import { CommonGetAllParams } from "constants/types/common.type";
import { TypeEquipment } from "constants/types/equipment.type";

type equipmentState = {
  equipments: Array<TypeEquipment>;
  limit: number;
  page: number;
  total: number;
  isLoadingGetAllEquipment: boolean;
};

const initialState: equipmentState = {
  equipments: [],
  limit: 10,
  page: 1,
  total: 0,
  isLoadingGetAllEquipment: true,
};

const equipmentStore = createState(initialState);

export const getAllEquipment = async (params?: CommonGetAllParams) => {
  try {
    equipmentStore.isLoadingGetAllEquipment.set(true);
    const _params = {
      ...params,
      page: params?.page ? params.page : equipmentStore.page.get(),
      limit: params?.limit ? params.limit : equipmentStore.limit.get(),
    };
    const dataRes = await equipmentAPI.getAll(_params);

    equipmentStore.set({
      equipments: dataRes.data.data,
      page: dataRes.data.page,
      total: dataRes.data.total,
      limit: dataRes.data.limit,
      isLoadingGetAllEquipment: false,
    });
  } catch (error) {
    equipmentStore.isLoadingGetAllEquipment.set(false);
    message.error("Lỗi khi lấy danh sách trang thiết bị.");
  }
};

export default equipmentStore;
