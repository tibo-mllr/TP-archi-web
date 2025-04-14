import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { deleteCookie } from "cookies-next";

import { Recipe } from "./types";

export const api = Axios.create({
  baseURL: "https://gourmet.cours.quimerch.com",
  // Make an authenticated call if possible
  withCredentials: true,
  headers: { Accept: "application/json, application/xml" },
});

interface apiCallOptions<T> {
  axiosConfig?: AxiosRequestConfig;
  redirect401?: boolean;
  defaultResult?: T;
  errorCallback?: (error: AxiosError) => void | T;
}

// Create interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it so it can be handled by the caller
    // This is the case for 200, 201, 204, etc.
    return response;
  },
  (error) => {
    // If the response is an error, check if it is a 401
    if (error.response.status == 401 && error.config.redirect401) {
      // If it is a 401, redirect to the login page
      // The Nextjs `redirect` function does not work here (server-side)
      window.location.href = "/login";
      deleteCookie("sigmacooking_loggedinuser");
    } else {
      // If it is not a 401, just log the error
      console.error(error);
    }
    // Return a rejected promise to the caller
    return Promise.reject(error);
  },
);

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
  // Add the redirect401 option to the axiosConfig - only way to pass it to the interceptor
  axiosConfig = {
    ...axiosConfig,
    // @ts-expect-error modifying axiosConfig with custom props
    redirect401: redirect401,
  };
  return api
    .get<T>(url, axiosConfig)
    .then((response) => response.data)
    .catch((error) => {
      const callbackResult = errorCallback(error);
      return callbackResult || defaultResult;
    })
    .finally(() => defaultResult);
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
  axiosConfig = {
    ...axiosConfig,
    // @ts-expect-error modifying axiosConfig with custom props
    redirect401: redirect401,
  };
  return api
    .post<T>(url, data, axiosConfig)
    .then((response) => response.data)
    .catch((error) => {
      const callbackResult = errorCallback(error);
      return callbackResult || defaultResult;
    })
    .finally(() => defaultResult);
}

export async function getFavorites(
  redirect = false,
): Promise<Recipe[] | undefined> {
  const recipeResults = await apiGet<{ recipe: Recipe }[] | null>(
    "/favorites",
    {
      defaultResult: [],
      redirect401: redirect,
    },
  );
  return recipeResults?.map((outerRecipeObj) => outerRecipeObj.recipe);
}
