import { createState } from "@hookstate/core";
import { companyAPI } from "apis/company";
import { GetCompaniesParams } from "constants/types/companies.type";

type CompaniesState = {
  companies: Array<any>;
  companiesTree: Array<any>;
  limit?: number;
  page?: number;
  // total: number;
  isLoadingGetAllCompanies: boolean;
};

const initialState: CompaniesState = {
  companies: [],
  companiesTree: [],
  limit: 10,
  page: 1,
  // total: 0,
  isLoadingGetAllCompanies: true,
};

type NodeType = {
  title: string;
  value: string;
  children?: Array<any>;
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
    companiesStore.set({
      companies: [],
      companiesTree: dataRes.data,
      // page: dataRes.data.result.page,
      // limit: dataRes.data.result.limit,
      // total: dataRes.data.result.totalDocs,
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

    companiesStore.set({
      companies: [],
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
      const tempData = donVi.donVis.map((child: any) =>
        convertDonVi(child, tenDonvi)
      );
      node.children = tempData ? tempData[0] : null;
    }

    result.push(node);
  }

  return result;
}

export default companiesStore;
