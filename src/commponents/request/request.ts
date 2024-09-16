import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";
import {TrionesErr} from "../ex";
import _ from "lodash";

export type RequestOptions = {
  baseURL?: string;
  headers?: any;
  beforeRequest?: (request: InternalAxiosRequestConfig<any>) => any;
  onUnauthorized?: () => void;
};

export const createRequest = (options: RequestOptions): AxiosInstance => {
  const request = axios.create({
    baseURL: options?.baseURL || "/api",
    headers: _.assign({}, options?.headers, {
      "Content-Type": "application/json;charset=UTF-8",
    }),
  });

  request.interceptors.request.use((request) => {
    request.headers = Object.assign({}, request.headers);
    options?.beforeRequest?.(request);
    return request;
  });

  request.interceptors.response.use(
    function (response) {
      debugger
      console.log("response", response)
      return response.data;
    },
    function (error) {
      console.log("error", error)
      debugger
      if (!error || !error.response) {
        return Promise.reject(new TrionesErr(500, "服务器异常，请稍后再试"));
      }
      let status = error.response.status;
      if (status === 401) {
        options?.onUnauthorized?.();
      } else if (status === 500) {
        return Promise.reject(new TrionesErr(500, "服务器异常，请稍后再试"));
      } else if (status === 400) {
        return Promise.reject(new TrionesErr(400, "请求参数错误"));
      } else {
        return Promise.reject(
          error.response.data || new TrionesErr(status, "系统异常，请稍后再试")
        );
      }
    }
  );
  return request;
};
