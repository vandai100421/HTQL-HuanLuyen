import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Option, ProductCategoryOption } from "constants/types/common.type";
import {
  GetSelectionProductCategoriesSuccessPayload,
  GetSelectionRolesSuccessPayload,
} from "pages/App/store/store.type";

interface AppState {
  isLogged: boolean;
  productCategoriesSelection: Array<ProductCategoryOption>;
  rolesSelection: Array<Option>;
}

const initialState: AppState = {
  isLogged: false,
  productCategoriesSelection: [],
  rolesSelection: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state: any) => {
      state.isLogged = true;
    },
    logout: (state: any) => {
      state.isLogged = false;
    },
    getSelectionProductCategories: (state: any) => {
      return state;
    },
    getSelectionProductCategoriesSuccess: (
      state: any,
      action: PayloadAction<GetSelectionProductCategoriesSuccessPayload>
    ) => {
      state.productCategoriesSelection =
        action.payload.productCategoriesSelection;
    },
    // get roles
    getSelectionRoles: (state: any) => {
      return state;
    },
    getSelectionRolesSuccess: (
      state: any,
      action: PayloadAction<GetSelectionRolesSuccessPayload>
    ) => {
      state.rolesSelection = action.payload.rolesSelection;
    },
  },
});

export const {
  login,
  logout,
  getSelectionProductCategories,
  getSelectionProductCategoriesSuccess,
  getSelectionRoles,
  getSelectionRolesSuccess,
} = appSlice.actions;
export default appSlice.reducer;
