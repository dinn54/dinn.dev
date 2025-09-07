/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useEffect, useRef, useState } from "react";
import { ImageProps } from "next/image";
import { getStorageLink } from "@/shared/model/getStorageLink";
import { useThemeToggle } from "@/shared/state/themeStore";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const { darkMode } = useThemeToggle();

  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false); // ✨ 애니메이션 활성 여부

  // 이미지가 로드된 후 다음 프레임에 애니메이션 활성화
  useEffect(() => {
    if (isLoaded) {
      const frame = requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isLoaded]);

  useEffect(() => {
    const preloadHref = getStorageLink(filePath) ?? defaultImage;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = preloadHref;

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [filePath, defaultImage]);

  const outlineColor = darkMode ? "#636363" : "#e0e0e0";

  return (
    <img
      ref={imgRef}
      src={src}
      onError={() => setSrc(defaultImage)}
      onLoad={() => setIsLoaded(true)}
      {...props}
      style={{
        borderRadius: "12px",
        outline: isLoaded ? `10px solid ${outlineColor}` : "none",
        transition: shouldAnimate ? "outline 0.3s ease-in" : "none",
      }}
    />
  );
};

export default ImageClient;
