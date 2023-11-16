import { request } from "apis/base";
import { LoginData } from "constants/types/auth.type";

const authApi = {
  login: (data: LoginData) => {
    return request("/v1/auth/authenticate", {
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
