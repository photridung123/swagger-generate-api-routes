import urlcat, { ParamMap } from "urlcat";
import { API } from "./API";

type Any = { [key: string]: any };

type AllMethod = "get" | "put" | "post" | "delete" | "patch";
type BodyMethod = Exclude<AllMethod, "get">;

type ReturnType<T> = "200" extends keyof T
  ? T["200"]
  : "201" extends keyof T
    ? T["201"]
    : "204" extends keyof T
      ? T["204"]
      : "default" extends keyof T
        ? T["default"]
        : unknown;

type Query<
  Paths,
  K extends keyof Paths,
  Method extends AllMethod,
> = Method extends keyof Paths[K]
  ? "request" extends keyof Paths[K][Method]
    ? "query" extends keyof Paths[K][Method]["request"]
      ? Paths[K][Method]["request"]["query"]
      : Any
    : Any
  : Any;

type Path<
  Paths,
  K extends keyof Paths,
  Method extends AllMethod,
> = Method extends keyof Paths[K]
  ? "request" extends keyof Paths[K][Method]
    ? "path" extends keyof Paths[K][Method]["request"]
      ? Paths[K][Method]["request"]["path"]
      : Any
    : Any
  : Any;

type Body<
  Paths,
  K extends keyof Paths,
  Method extends BodyMethod,
> = Method extends keyof Paths[K]
  ? "request" extends keyof Paths[K][Method]
    ? "body" extends keyof Paths[K][Method]["request"]
      ? Paths[K][Method]["request"]["body"]
      : Any
    : Any
  : Any;

type SuccessResponse<
  Paths,
  K extends keyof Paths,
  Method extends AllMethod,
> = Method extends keyof Paths[K]
  ? "responses" extends keyof Paths[K][Method]
    ? ReturnType<Paths[K][Method]["responses"]>
    : Any
  : Any;

export type Params<
  Paths,
  K extends keyof Paths,
  Method extends AllMethod,
> = Query<Paths, K, Method> & Path<Paths, K, Method> & ParamMap;

export type PathsWithMethod<Paths, PathnameMethod extends AllMethod> = {
  [Pathname in keyof Paths]: Paths[Pathname] extends {
    [K in PathnameMethod]: any;
  }
    ? Pathname
    : never;
}[keyof Paths];

const apiUrl = (baseTemplate: string, params: ParamMap) => {
  const url = baseTemplate.replace(/{([a-zA-Z0-9_-]+)}/g, ":$1");
  return urlcat(url, params);
};

export function createFetchApi<Paths>(apiClient: API) {
  return {
    async get<K extends PathsWithMethod<Paths, "get"> & string>(
      path: K,
      params: Params<Paths, K, "get">
    ) {
      const url = apiUrl(path, params);
      //@ts-ignore
      return apiClient.get<SuccessResponse<Paths, K, "get">>(url);
    },
    async post<K extends PathsWithMethod<Paths, "post"> & string>(
      path: K,
      params: Params<Paths, K, "post">,
      data?: Body<Paths, K, "post">
    ) {
      const url = apiUrl(path, params);
      //@ts-ignore
      return apiClient.post<SuccessResponse<Paths, K, "post">>(url, data);
    },
    async put<K extends PathsWithMethod<Paths, "put"> & string>(
      path: K,
      params: Params<Paths, K, "put">,
      data?: Body<Paths, K, "put">
    ) {
      const url = apiUrl(path, params);
      //@ts-ignore
      return apiClient.put<SuccessResponse<Paths, K, "put">>(url, data);
    },
    async delete<K extends PathsWithMethod<Paths, "delete"> & string>(
      path: K,
      params: Params<Paths, K, "delete">
    ) {
      const url = apiUrl(path, params);
      //@ts-ignore
      return apiClient.delete<SuccessResponse<Paths, K, "delete">>(url);
    },
    async patch<K extends PathsWithMethod<Paths, "patch"> & string>(
      path: K,
      params: Params<Paths, K, "patch">,
      data?: Body<Paths, K, "patch">
    ) {
      const url = apiUrl(path, params);
      //@ts-ignore
      return apiClient.patch<SuccessResponse<Paths, K, "patch">>(url, data);
    },
  };
}
