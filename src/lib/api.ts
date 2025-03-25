import Axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

export const api = Axios.create({
  baseURL: "https://gourmet.cours.quimerch.com",
  // Make an authenticated call if possible
  withCredentials: true,
  headers: { Accept: "application/json, application/xml" },
});

export async function apiGet<T>(
  url: string,
  config: object = {}, // Default: empty object - usually used for query params
  redirect401: boolean = true, // Default: true - redirect to login page in case of 401
  defaultResult: T = <T>null, // Default: null
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorCallback: (error: AxiosError) => void = (_error) => {}, // Default: do nothing
): Promise<T> {
  return api
    .get<T>(url, config)
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
  config: object = {}, // Default: empty object - usually used for query params
  redirect401: boolean = true, // Default: true - redirect to login page in case of 401
  defaultResult: T = <T>null, // Default: null
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorCallback: (error: AxiosError) => void = (_error) => {}, // Default: do nothing
): Promise<T> {
  return api
    .post<T>(url, data, config)
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
