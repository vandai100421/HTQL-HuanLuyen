import { request } from "apis/base";
import { GetCompaniesParams } from "constants/types/companies.type";

export const companyAPI = {
  getAll: (params?: GetCompaniesParams) => {
    return request("/DonVi/search", {
      method: "GET",
      params,
    });
  },
  getTre: () => {
    return request("/DonVi", {
      method: "GET",
    });
  },
};
