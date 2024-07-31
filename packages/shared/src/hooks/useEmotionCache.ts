import { useContext } from "react";

import { EmotionContext } from "../context/EmotionContext";

export function useEmotionCache() {
  return useContext(EmotionContext).cache;
}
