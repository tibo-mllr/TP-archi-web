import Axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

export const api = Axios.create({
  baseURL: "https://gourmet.cours.quimerch.com",
  // Make an authenticated call if possible
  withCredentials: true,
  headers: { Accept: "application/json, application/xml" },
});

interface apiCallOptions<T> {
  axiosConfig?: object;
  redirect401?: boolean;
  defaultResult?: T;
  errorCallback?: (error: AxiosError) => void | T;
}

export async function apiGet<T>(
  url: string,
  // Very cursed syntax, but see https://stackoverflow.com/questions/23314806/setting-default-value-for-typescript-object-passed-as-argument
  {
    axiosConfig = {}, // Default: empty object - usually used for query params
    redirect401 = true, // Default: true - redirect to login page in case of 401
    defaultResult = <T>null, // Default: null
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorCallback = (_error) => {}, // Default: do nothing
  }: apiCallOptions<T> = {},
): Promise<T> {
  return api
    .get<T>(url, axiosConfig)
    .then((response) => response.data)
    .catch((error) => {
      // "Usual" callback in case of expired token
      if (redirect401 && error.response.status == 401) {
        redirect("/login");
      }

      // Custom callback in other cases
      errorCallback(error);
      return defaultResult;
    });
}

export async function apiPost<T>(
  url: string,
  data: object, // No default, usually for a post we will want a body
  {
    axiosConfig = {},
    redirect401 = true, // Default: true - redirect to login page in case of 401
    defaultResult = <T>null, // Default: null
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorCallback = (_error) => {}, // Default: empty object - usually used for query params
  }: apiCallOptions<T> = {},
): Promise<T> {
  return api
    .post<T>(url, data, axiosConfig)
    .then((response) => response.data)
    .catch((error) => {
      // "Usual" callback in case of expired token
      if (redirect401 && error.response.status == 401) {
        redirect("/login");
      }

      // Custom callback in other cases
      errorCallback(error);
      return defaultResult;
    });
}
