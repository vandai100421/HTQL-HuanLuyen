import { request } from "apis/base";
import {
  GetCompaniesParams,
  TypeEditCompanies,
} from "constants/types/companies.type";

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

  create: (data: TypeEditCompanies) => {
    return request("/DonVi", {
      method: "POST",
      data,
    });
  },
  update: (data: TypeEditCompanies) => {
    return request("/DonVi/" + data.id, {
      method: "PUT",
      data,
    });
  },
};
