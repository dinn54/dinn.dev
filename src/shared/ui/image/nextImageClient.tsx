/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { getStorageLink } from "@/shared/model/getStorageLink";

type NextImageClientProps = Omit<ImageProps, "src"> & {
  filePath: string;
  defaultImage?: string;
};

const NextImageClient = ({
  filePath,
  defaultImage = "/photo.png",
  ...props
}: NextImageClientProps) => {
  const [src, setSrc] = useState(getStorageLink(filePath) ?? defaultImage);

  return (
    <Image priority src={src} onError={() => setSrc(defaultImage)} {...props} />
  );
};

export default NextImageClient;
