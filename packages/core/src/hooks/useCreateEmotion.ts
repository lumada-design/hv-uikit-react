import createEmotion from "@emotion/css/create-instance";
import { useContext, useMemo } from "react";
import { HvThemeContext } from "../providers/ThemeProvider";

/**
 * Emotion CSS utilities
 */
export const useCreateEmotion = () => {
  const { classNameKey } = useContext(HvThemeContext);

  // Emotion cache
  // Moves UI Kit styles to the top of the <head> so they're loaded first.
  // This enables users to override the UI Kit styles if necessary.
  const emotionCss = useMemo(
    () =>
      createEmotion({
        key: classNameKey || "hv-uikit-css",
        prepend: true,
      }),
    [classNameKey]
  );

  return emotionCss;
};
