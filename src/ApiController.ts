import axios, {AxiosInstance, Method} from "axios";
import {defaultApiOptions} from "./defaults";

export interface ApiOptions {
  baseURL: string;
  timeout: number;
  name: string;
}

/**
 * @ignore
 *
 * Abstract class for other controllers
 */
export abstract class ApiController {
  protected readonly api: AxiosInstance;

  protected constructor(apiOptions?: Partial<ApiOptions>) {
    this.api = getAxios({...defaultApiOptions, ...apiOptions});
  }

  protected async request<T>(
    method: Method,
    path: string,
    params: any = {},
    data: any = null,
    extractData: boolean = true
  ): Promise<T> {
    return this.api.request({
      method,
      url: path,
      data,
      params
    }).then(res => extractData ? res.data : res);
  }
}

function getAxios(apiOptions: ApiOptions): AxiosInstance {
  return axios.create({
    baseURL: apiOptions.baseURL,
    timeout: apiOptions.timeout,
    headers: {'x-client': apiOptions.name}
  });
}
