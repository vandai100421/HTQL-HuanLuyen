import { createState } from "@hookstate/core";
import { GetCustomers, TypeCustomers } from "constants/types/customers.type";
import { studentAPI } from "apis/student";
import { GetStudentsParams } from "constants/types/students.type";

type StudentsState = {
  students: Array<TypeCustomers>;
  limit?: number;
  page?: number;
  isLoadingGetAllStudent: boolean;
};

const initialState: StudentsState = {
  students: [],
  limit: 10,
  page: 1,
  isLoadingGetAllStudent: true,
};

const studentsStore = createState(initialState);

export const fetchStudentList = async (params?: GetStudentsParams) => {
  try {
    studentsStore.isLoadingGetAllStudent.set(true);
    const _params = {
      ...params,
      page: params?.page ? params.page : studentsStore.page.get(),
      limit: params?.limit ? params.limit : studentsStore.limit.get(),
    };

    const dataRes = await studentAPI.getAll(_params);

    studentsStore.set({
      students: dataRes.data.data,
      // page: dataRes.data.result.page,
      // limit: dataRes.data.result.limit,
      isLoadingGetAllStudent: false,
    });
  } catch (error) {
    studentsStore.isLoadingGetAllStudent.set(false);
  }
};

export default studentsStore;
