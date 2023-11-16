import { request } from "apis/base";
import {
  CreateNewProductData,
  EditProductData,
  GetProductsParams,
} from "constants/types/product.type";

export const productApi = {
  getAll: (params?: GetProductsParams) => {
    return request("/admin/dishes/", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getFilter: (params?: GetProductsParams) => {
    return request("/admin/dishes/search/", {
      method: "GET",
      params,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  getOne: (productId: string) => {
    return request("/admin/dishes/getbyid/" + productId, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  create: (data: CreateNewProductData) => {
    return request("/admin/dishes/add", {
      method: "POST",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  update: (productId: string, data: EditProductData) => {
    return request("/admin/dishes/update", {
      method: "PUT",
      data,
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
  delete: (productId: string) => {
    return request("/admin/dishes/delete/" + productId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};
