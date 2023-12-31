import { createState } from "@hookstate/core";
import { companyAPI } from "apis/company";
import {
  GetCompaniesParams,
  TypeCompanies,
  TypeLoaiDonVi,
} from "constants/types/companies.type";

type CompaniesState = {
  companies: Array<TypeCompanies>;
  companiesTree: Array<any>;
  loaiDonVis: Array<TypeLoaiDonVi>;
  limit?: number;
  page?: number;
  total: number;
  isLoadingGetAllCompanies: boolean;
};

const initialState: CompaniesState = {
  companies: [],
  companiesTree: [],
  loaiDonVis: [],
  limit: 10,
  page: 1,
  total: 0,
  isLoadingGetAllCompanies: true,
};

type NodeType = {
  title: string;
  value: string;
  children?: NodeType[];
};

const companiesStore = createState(initialState);

export const fetchCompaniesList = async (params?: GetCompaniesParams) => {
  try {
    companiesStore.isLoadingGetAllCompanies.set(true);

    const _params = {
      ...params,
      page: params?.page ? params.page : companiesStore.page.get(),
      limit: params?.limit ? params.limit : companiesStore.limit.get(),
    };

    const dataRes = await companyAPI.getAll(_params);
    companiesStore.merge({
      companies: dataRes.data.data,
      page: dataRes.data.page,
      limit: dataRes.data.limit,
      total: dataRes.data.total,
      isLoadingGetAllCompanies: false,
    });
  } catch (error) {
    companiesStore.isLoadingGetAllCompanies.set(false);
  }
};

export const fetchCompaniesTree = async () => {
  try {
    companiesStore.isLoadingGetAllCompanies.set(true);

    const dataRes = await companyAPI.getTre();

    const companiesTree = convertDonVi(dataRes.data.data, null);

    companiesStore.merge({
      companiesTree: companiesTree,
      // page: dataRes.data.result.page,
      // limit: dataRes.data.result.limit,
      // total: dataRes.data.result.totalDocs,
      isLoadingGetAllCompanies: false,
    });
  } catch (error) {
    companiesStore.isLoadingGetAllCompanies.set(false);
  }
};

function convertDonVi(donVi: any, tenCha: any) {
  const result = [];
  const tenDonvi =
    tenCha !== null ? `${tenCha} - ${donVi.tenDonVi}` : donVi.tenDonVi;

  if (donVi) {
    const node: NodeType = {
      title: tenDonvi,
      value: donVi.id.toString(),
    };

    if (donVi.donVis && donVi.donVis.length > 0) {
      const tempData = donVi.donVis.map(
        (child: any) => convertDonVi(child, tenDonvi)[0]
      );
      node.children = tempData ? tempData : null;
    }

    result.push(node);
  }

  return result;
}

export const getAllLoaiDonVi = async () => {
  try {
    const dataRes = await companyAPI.getAllLoaiDonVi();
    companiesStore.merge({
      loaiDonVis: dataRes.data.data,
    });
  } catch (error) {
    console.error("Lối khi lấy loại đơn vị");
  }
};

export default companiesStore;
