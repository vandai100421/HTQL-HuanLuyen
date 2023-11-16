import axios from "axios";
import qs from "qs";

export const request = axios.create({
  baseURL: "https://localhost:44384/api",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "*",
  },
  paramsSerializer: (params) => qs.stringify(params),
});
