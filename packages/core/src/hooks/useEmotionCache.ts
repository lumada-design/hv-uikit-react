import { useContext } from "react";

import { EmotionContext } from "@core/providers/ThemeProvider";

export function useEmotionCache() {
  return useContext(EmotionContext).cache;
}
