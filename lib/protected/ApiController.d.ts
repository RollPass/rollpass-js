import { AxiosInstance, Method } from "axios";
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
export declare abstract class ApiController {
    protected readonly api: AxiosInstance;
    protected constructor(apiOptions?: Partial<ApiOptions>);
    protected request<T>(method: Method, path: string, params?: any, data?: any, extractData?: boolean): Promise<T>;
}
