"use client";

import Image, { ImageProps } from "next/image";
import { ReactElement, useState } from "react";

type ImageWithFallbackProps = Omit<ImageProps, "onError" | "src"> & {
  src?: string;
  hideIfNoImage?: boolean;
};

export function ImageWithFallback({
  src,
  hideIfNoImage = false,
  ...props
}: ImageWithFallbackProps): ReactElement {
  const [imgSrc, setImgSrc] = useState(src || "/defaultDishImage.webp");

  if (hideIfNoImage && imgSrc === "/defaultDishImage.webp")
    return <i>Image seems broken at the moment. Please retry later.</i>;

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc("/defaultDishImage.webp")}
    />
  );
}
