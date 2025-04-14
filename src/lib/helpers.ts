import { apiGet } from "./api";
import { Recipe } from "./types";

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

type JWTContent = {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  jti: string;
  roles: string[];
};

export function parseJwt(token: string): JWTContent {
  // eslint-disable-next-line prefer-destructuring
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export async function getFavorites(): Promise<Recipe[]> {
  const recipeResults = await apiGet<{ recipe: Recipe }[]>("/favorites", {
    defaultResult: [],
  });
  return recipeResults.map((outerRecipeObj) => outerRecipeObj.recipe);
}
