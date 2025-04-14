import Axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

import { Recipe } from "./types";

const baseURL = "https://gourmet.cours.quimerch.com";

export class API {
  private static client = Axios.create({
    baseURL: baseURL,
  });

  // *** AUTH ***

  static async login(username: string, password: string): Promise<void> {
    const { data } = await this.client.post<{
      token: string;
    }>("/login", {
      username,
      password,
    });

    this.setAuth(data.token, username);
  }

  static async logout(): Promise<void> {
    this.getAuth();
    this.removeAuth();

    await this.client.get("/logout");
  }

  static setAuth(token: string, username: string): void {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  private static getAuth(redirectToLogin = false): void {
    const token = window.sessionStorage.getItem("token");
    // If the cookie is not found, that means it has expired or was never set
    if (!token && redirectToLogin) redirect("/login");

    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  static removeAuth(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    delete this.client.defaults.headers.common.Authorization;
  }

  static getLoggedInUser(): string {
    const username = window.sessionStorage.getItem("username");
    // If the cookie is not found, that means it has expired or was never set
    if (!username) {
      return ""; // No user logged in, represented by ""
    }
    return username;
  }

  static async getRecipes(): Promise<Recipe[]> {
    noStore();

    const { data } = await this.client.get<Recipe[]>("/recipes");
    return data;
  }

  static async getRecipe<T extends null | Recipe>(
    id: string,
    defaultResult: T,
  ): Promise<Recipe | T> {
    noStore();

    const { data } = await this.client.get<Recipe | null>(`/recipes/${id}`);
    if (data == null) return defaultResult;

    return data;
  }

  static async getRelatedRecipes(id: string): Promise<Recipe[]> {
    noStore();

    const { data } = await this.client.get<Recipe[]>(`/recipes/${id}/related`);
    return data;
  }

  static async getFavorites(): Promise<Recipe[]> {
    noStore();
    this.getAuth();

    const { data } = await this.client.get<{ recipe: Recipe }[] | null>(
      "/favorites",
    );
    return data?.map((item) => item.recipe) || [];
  }

  static async addFavorite(id: string): Promise<void> {
    this.getAuth(true);

    await this.client.post(
      `/users/${this.getLoggedInUser()}/favorites`,
      {},
      { params: { recipeID: id } },
    );
  }

  static async deleteFavorite(id: string): Promise<void> {
    this.getAuth();

    await this.client.delete(`/users/${this.getLoggedInUser()}/favorites`, {
      params: { recipeID: id },
    });
  }
}
