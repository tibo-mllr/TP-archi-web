import { Metadata, ResolvingMetadata } from "next";
import { ReactElement } from "react";

import { RecipeImage } from "@/components";
import { api } from "@/lib";
import { Recipe } from "@/lib/types";

type RecipePageProps = {
  params: Promise<{ recipeId: string }>;
};

export async function generateMetadata(
  { params }: RecipePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { recipeId } = await params;

  let recipe: Recipe;
  try {
    recipe = await api
      .get<Recipe>(`/recipes/${recipeId}`)
      .then((response) => response.data);
  } catch (error) {
    console.error(error);
    return {}; // If error, don't change metadata
  }

  const globalTitle = (await parent).title?.absolute;

  return {
    title: `${recipe.name || ""} | ${globalTitle}`,
  };
}

export default async function RecipePage({
  params,
}: RecipePageProps): Promise<ReactElement> {
  const { recipeId } = await params;

  let recipe: Recipe;
  try {
    recipe = await api
      .get<Recipe>(`/recipes/${recipeId}`)
      .then((response) => response.data);
  } catch (error) {
    console.error(error);
    return <i>An error occured. Please try again later</i>;
  }

  const {
    calories,
    category,
    cook_time,
    cost,
    created_at,
    created_by,
    description,
    disclaimer,
    image_url,
    instructions,
    name,
    prep_time,
    published,
    servings,
    when_to_eat,
  } = recipe;

  return (
    <div className="flex flex-col space-y-3">
      {/* Presentation part */}
      <div className="flex flex-row space-x-3">
        <RecipeImage src={image_url} alt={description} />
        <div>
          <h1>{name}</h1>
          <ul>
            <li>
              <b>Category:</b> {category || <i>Undefined</i>}
            </li>
            <li>
              <b>When to eat:</b> {when_to_eat}
            </li>
            {!!servings && <li>For {servings} servings</li>}
            <li>
              <b>Preparation time:</b> {prep_time} minutes
            </li>
            <li>
              <b>Cooking time:</b> {cook_time} minutes
            </li>
            {!!calories && <li>{calories} calories</li>}
            {!!cost && <li>{cost} cost</li>}
          </ul>
        </div>
      </div>
      {/* Disclaimer */}
      {!!disclaimer && (
        <div>
          <i>Disclaimer: {disclaimer}</i>
        </div>
      )}
      {/* Instructions */}
      <div>
        <h2>Instructions</h2>
        <pre style={{ maxWidth: "100%", overflowX: "auto" }}>
          {instructions}
        </pre>
      </div>
      {/* Metadata */}
      <footer>
        <p>
          Created by {created_by} on {created_at}
        </p>
        {published ? <p>Published</p> : <p>Not published</p>}
      </footer>
    </div>
  );
}
