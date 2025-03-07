import { type ReactElement } from "react";

import { api } from "@/lib";
import { Recipe } from "@/lib/types";

export default async function Home(): Promise<ReactElement> {
  const recipes = await api
    .get<Recipe[]>("/recipes")
    .then((response) => response.data);

  return (
    <div>
      <table
        style={{ width: "100%" }}
        className="border-1 border-black dark:border-white"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.category || <i>None</i>}</td>
              <td>{recipe.description}</td>
              <td>{recipe.cost || <i>Unknown</i>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
