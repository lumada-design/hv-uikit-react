import { useEffect, useState } from "react";

export const useImageLoaded = (src?: string, srcSet?: string) => {
  const [imageLoaded, setImageLoaded] = useState<boolean | string>(false);

  useEffect(() => {
    if (!src && !srcSet) return;

    setImageLoaded(false);

    const { abort, signal } = new AbortController();

    const image = new Image();
    image.src = src || "";
    image.srcset = srcSet || "";
    image.addEventListener(
      "load",
      () => {
        setImageLoaded("loaded");
      },
      { signal },
    );
    image.addEventListener(
      "error",
      () => {
        setImageLoaded("error");
      },
      { signal },
    );

    return () => {
      abort();
    };
  }, [src, srcSet]);

  return imageLoaded;
};
