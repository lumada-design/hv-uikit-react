import { useEffect, useState } from "react";

export const useImageLoaded = (src, srcSet) => {
  const [imageLoaded, setImageLoaded] = useState<boolean | string>(false);

  useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setImageLoaded(false);

    let active = true;
    const image = new Image();
    image.src = src;
    image.srcset = srcSet;
    image.onload = () => {
      if (!active) {
        return;
      }

      setImageLoaded("loaded");
    };
    image.onerror = () => {
      if (!active) {
        return;
      }

      setImageLoaded("error");
    };

    return () => {
      active = false;
    };
  }, [src, srcSet]);

  return imageLoaded;
};
