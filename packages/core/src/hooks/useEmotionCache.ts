import { useContext } from "react";

import { EmotionContext } from "../providers/ThemeProvider";

export function useEmotionCache() {
  return useContext(EmotionContext).cache;
}
