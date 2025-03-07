"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactElement } from "react";

import { api } from "@/lib";
import { type Recipe } from "@/lib/types";

export default function Home(): ReactElement {
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    api.get<Recipe[]>("/recipes").then((response) => setRecipes(response.data));
  }, []);

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
            <tr
              key={recipe.id}
              onClick={() => router.push(`/recettes/${recipe.id}`)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
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
