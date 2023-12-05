import { createState } from "@hookstate/core";
import { TypeCapBac } from "constants/types/capbac.type";
import { capBacAPI } from "apis/capbac";
import { chucVuAPI } from "apis/chucvu";
import { TypeChucVu } from "constants/types/chucvu.type";

type CommonState = {
  capBacs: Array<TypeCapBac>;
  chucVus: Array<TypeChucVu>;
  isLoading: boolean;
};

const initialState: CommonState = {
  capBacs: [],
  chucVus: [],
  isLoading: false,
};

const commonStore = createState(initialState);

export const fetchCommon = async () => {
  try {
    commonStore.isLoading.set(true);

    const dataCapBac = await capBacAPI.getAll();
    const dataChucVu = await chucVuAPI.getAll();

    commonStore.merge({
      capBacs: dataCapBac.data.data,
      chucVus: dataChucVu.data.data,
      isLoading: false,
    });
  } catch (error) {
    commonStore.isLoading.set(false);
  }
};

export default commonStore;
