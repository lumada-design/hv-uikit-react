import { useContext } from "react";
import { EmotionContext } from "..";

export function useEmotionCache() {
  return useContext(EmotionContext).cache;
}
