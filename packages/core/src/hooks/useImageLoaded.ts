import { useEffect, useState } from "react";

export const useImageLoaded = (src?: string, srcSet?: string) => {
  const [imageLoaded, setImageLoaded] = useState<boolean | string>(false);

  useEffect(() => {
    if (!src && !srcSet) return;

    setImageLoaded(false);

    let active = true;
    const image = new Image();
    image.src = src || "";
    image.srcset = srcSet || "";
    // oxlint-disable prefer-add-event-listener
    image.onload = () => {
      if (!active) return;

      setImageLoaded("loaded");
    };
    image.onerror = () => {
      if (!active) return;

      setImageLoaded("error");
    };

    return () => {
      active = false;
    };
  }, [src, srcSet]);

  return imageLoaded;
};
