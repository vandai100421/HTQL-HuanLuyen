import { createState } from "@hookstate/core";
import { GetCustomers, TypeCustomers } from "constants/types/customers.type";

type CustomersState = {
  customers: Array<TypeCustomers>;
  // limit: number;
  // page: number;
  // total: number;
  isLoadingGetAllCustomers: boolean;
};

const initialState: CustomersState = {
  customers: [],
  // limit: 10,
  // page: 1,
  // total: 0,
  isLoadingGetAllCustomers: true,
};

const customersStore = createState(initialState);

export const fetchCustomersList = async (params?: GetCustomers) => {
  try {
    customersStore.isLoadingGetAllCustomers.set(true);
    const _params = {
      ...params,
      // page: params?.page ? params.page : customersStore.page.get(),
      // limit: params?.limit ? params.limit : customersStore.limit.get(),
    };

    customersStore.set({
      customers: [],
      // page: dataRes.data.result.page,
      // limit: dataRes.data.result.limit,
      // total: dataRes.data.result.totalDocs,
      isLoadingGetAllCustomers: false,
    });
  } catch (error) {
    customersStore.isLoadingGetAllCustomers.set(false);
  }
};

export default customersStore;
