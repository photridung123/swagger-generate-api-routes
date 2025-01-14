import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  CancelToken,
  isAxiosError,
  RawAxiosResponseHeaders,
} from "axios";
import { authorizationKey, HttpErrorCode, TokenMethod } from "../constant";

export interface APIResult<T> {
  abort: () => void;
  data: T;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
}

export class API {
  protected client!: AxiosInstance;

  // protected readonly abortController = new AbortController();
  protected readonly abortControllers = new Map<CancelToken, AbortController>();

  errorHandlers = new Map<HttpErrorCode, (error: AxiosResponse, retry: () => Promise<any>) => void>();

  /**
   * This is a constructor function that creates an instance of the axios client with a base URL and
   * optional configuration.
   * @param {string} baseUrl - The `baseUrl` parameter is a string that represents the base URL of the
   * API endpoint that the Axios client will be making requests to. It is used to construct the full
   * URL for each request.
   * @param {AxiosRequestConfig} config - The `config` parameter is an optional object that can be
   * passed to the constructor of the class. It is of type `AxiosRequestConfig`, which is an interface
   * provided by the Axios library. This object can contain various configuration options for the Axios
   * client, such as headers, timeout, authentication, etc.
   */
  constructor(protected readonly baseUrl: string, protected readonly config: AxiosRequestConfig = {}) {
    this.client = axios.create({
      ...config,
      baseURL: baseUrl,
    });
  }

  setAccessToken(getter: () => string, tokenMethod = TokenMethod.Bearer) {
    this.client.interceptors.request.use(config => {
      config.headers[authorizationKey] = `${tokenMethod} ${getter()}`;
      return config;
    });
  }

  setErrorHandler(code: HttpErrorCode, handler: (error: AxiosResponse, retry: () => Promise<any>) => void) {
    this.errorHandlers.set(code, handler);
  }

  onError(errorsHandler: (error: any, retry?: () => Promise<any>) => void) {
    this.client.interceptors.response.use(undefined, error => {
      if (!isAxiosError(error)) {
        return errorsHandler(error);
      }
      const { response } = error;
      if (response) {
        const handler = this.errorHandlers.get(response.status);
        const retry = () => this.client.request(response.config);
        if (handler) {
          return handler(response, retry);
        }
        return errorsHandler(response, retry);
      }
      return errorsHandler(error);
    });
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  protected abort = (cancelToken: CancelToken) => {
    const controller = this.abortControllers.get(cancelToken);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  protected async request<T extends Record<string, any>>(config: AxiosRequestConfig): Promise<APIResult<T>> {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const signalKey = source.token;
    const signal = this.createAbortSignal(signalKey);

    const result = await this.client.request<T>({
      ...config,
      signal,
    });

    return {
      data: result.data,
      abort: () => this.abort(signalKey),
      headers: result?.headers,
    };
  }

  public get<T extends Record<string, any>>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "GET" });
  }

  public post<T extends Record<string, any>, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "POST" });
  }

  public put<T extends Record<string, any>, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "PUT" });
  }

  public patch<T extends Record<string, any>, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "PATCH" });
  }

  public delete<T extends Record<string, any>>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "DELETE" });
  }
}
