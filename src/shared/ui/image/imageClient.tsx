/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useState } from "react";
import { ImageProps } from "next/image";
import { getStorageLink } from "@/shared/model/getStorageLink";

type NextImageClientProps = Omit<ImageProps, "src"> & {
  filePath: string;
  defaultImage?: string;
};

const ImageClient = ({
  filePath,
  defaultImage = "/photo.png",
  ...props
}: NextImageClientProps) => {
  const [src, setSrc] = useState(getStorageLink(filePath) ?? defaultImage);

  return <img src={src} onError={() => setSrc(defaultImage)} {...props} />;
};

export default ImageClient;
