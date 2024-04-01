// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged
import { message } from "antd";
import type { AxiosResponse } from "axios";
import type { RequestOptions, RequestResult } from "types/axios";
import type { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";

import { VAxios } from "./Axios";
import { checkStatus } from "./checkStatus";
import { isString, isFunction, clone, cloneDeep as deepMerge } from "lodash-es";
import { appendUrlParams } from "@/utils/utils";
import { RequestEnum, ResultEnum, ContentTypeEnum } from "./constants";
import { joinTimestamp, formatRequestDate } from "./helper";

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (
    res: AxiosResponse<RequestResult>,
    options: RequestOptions
  ) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回

    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error("请求出错，请稍候重试");
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, result, message } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess =
      data && Reflect.has(data, "code") && code === ResultEnum.SUCCESS;

    if (hasSuccess) {
      if (message) {
        debugger;
        context.message && context.message.success(message);
      }

      return result;
    }

    // @ts-ignore
    context.message.error(message);

    switch (code) {
      case ResultEnum.TIMEOUT:
        context.unauthorizedFunction?.(message);
        break;
    }

    throw new Error(message);
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options;
    const { baseURL } = config;
    if (apiUrl) {
      let _apiUrl = isString(apiUrl) ? apiUrl : (apiUrl as any)();
      config.url = `${_apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        );
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, "data") &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = appendUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = context.getTokenFunction?.();
    if (
      token &&
      (config as Record<any, any>)?.requestOptions?.withToken !== false
    ) {
      // jwt token
      (config as Record<any, any>).headers.Authorization =
        options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token;
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || "none";
    const msg: string = response?.data?.error?.message ?? "";
    const err: string = error?.toString?.() ?? "";
    let errMessage = "";

    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        errMessage = "接口请求超时,请刷新页面重试!";
      }
      if (err?.includes("Network Error")) {
        errMessage = "网络异常，请检查您的网络连接是否正常!";
      }

      if (errMessage) {
        if (errorMessageMode === "modal") {
          context.Modal.error({
            title: "错误提示'",
            content: errMessage,
          });
        } else if (errorMessageMode === "message") {
          context.message.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(error?.response?.status, msg, errorMessageMode);
    return Promise.reject(error);
  },
};

export const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  return new VAxios(
    deepMerge({
      // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
      // authentication schemes，e.g: Bearer
      // authenticationScheme: 'Bearer',
      authenticationScheme: "",
      timeout: 10 * 1000,
      // 基础接口地址
      // baseURL: '',

      headers: { "Content-Type": ContentTypeEnum.JSON },
      // 如果是form-data格式
      // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
      // 数据处理方式
      transform: clone(transform),
      // 配置项，下面的选项都可以在独立的接口请求中覆盖
      requestOptions: {
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        isReturnNativeResponse: false,
        // 需要对返回数据进行处理
        isTransformResponse: true,
        // post请求的时候添加参数到url
        joinParamsToUrl: false,
        // 格式化提交参数时间
        formatDate: true,
        // 消息提示类型
        errorMessageMode: "message",
        // 接口地址
        apiUrl: "",
        //  是否加入时间戳
        joinTime: true,
        // 忽略重复请求
        ignoreCancelToken: true,
        // 是否携带token
        withToken: true,
      },
    })
  );
};

export let request = createAxios();

export function initRequest(
  opt: Partial<CreateAxiosOptions>,
  ctx: Partial<ContextOptions>
) {
  request = createAxios(opt);
  context = { ...context, ...ctx };
}
import type { ErrorMessageMode } from "types/axios";

export interface ContextOptions {
  errorFunction: AnyFunction<any>;
  msgFunction: AnyFunction<any>;
  errorModalFunction: AnyFunction<any>;
  noticeFunction: AnyFunction<any>;
  modalFunction: AnyFunction<any>;
  getTokenFunction: () => unknown;
  unauthorizedFunction: (msg?: string) => void;
  timeoutFunction: () => void;
  handleErrorFunction: (message?: string, mode?: ErrorMessageMode) => void;
  notification?: any;
  Modal?: any;
  message?: any;
  apiUrl?: string;
}

export let context: ContextOptions = {
  getTokenFunction: () => undefined,
  unauthorizedFunction: () => {},
  errorFunction: () => {},
  msgFunction: () => {},
  noticeFunction: () => {},
  modalFunction: () => {},
  errorModalFunction: () => {},
  handleErrorFunction: () => {},
  timeoutFunction: () => {},
  apiUrl: "",
  message: message,
};
export const setMsg = (func: AnyFunction<any>) => {
  context.msgFunction = func;
};
export const setNotice = (func: AnyFunction<any>) => {
  context.noticeFunction = func;
};
export const setDialog = (func: AnyFunction<any>) => {
  context.modalFunction = func;
};

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
