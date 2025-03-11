import Image from "next/image";
import { type ReactElement } from "react";
import sharp from "sharp";

type RecipeImageProps = {
  src?: string;
  alt?: string;
};

export async function RecipeImage({
  src,
  alt,
}: RecipeImageProps): Promise<ReactElement> {
  if (!src) return <i>Sorry, we don&apos;t have an image for this recipe...</i>;

  let res: Response;
  try {
    res = await fetch(src);
  } catch (error) {
    console.error(error);
    return <i>Sorry, we don&apos;t have an image for this recipe...</i>;
  }

  const buffer = await res.arrayBuffer();
  const { width, height } = await sharp(Buffer.from(buffer)).metadata();

  return (
    <Image
      src={src}
      alt={alt || "A picture of the dish"}
      // NextJS makes width and height mandatory for CLS issues, but after that, we can still change the size of the image
      width={width}
      height={height}
      // Now override width and height
      style={{ width: "40vw", height: "30vh", objectFit: "scale-down" }}
    />
  );
}
