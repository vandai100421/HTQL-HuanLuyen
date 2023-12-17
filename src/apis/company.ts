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
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getTre: () => {
    return request("/DonVi", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  create: (data: TypeEditCompanies) => {
    return request("/DonVi", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (data: TypeEditCompanies) => {
    return request("/DonVi/" + data.id, {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },

  delete: (id: number) => {
    return request("/DonVi/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getAllLoaiDonVi: () => {
    return request("/LoaiDonVi", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
