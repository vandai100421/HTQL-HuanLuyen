import { request } from "apis/base";
import { TypeLogin } from "constants/types/auth.type";

const authApi = {
  login: (data: TypeLogin) => {
    return request("/Auth/Login", {
      method: "POST",
      data,
    });
  },
  checkToken: () => {
    console.log("CheckToken");
  },
  logout: () => {
    return request("/admin/logout/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + String(window.sessionStorage.getItem("access_token")),
      },
    });
  },
};

export default authApi;
