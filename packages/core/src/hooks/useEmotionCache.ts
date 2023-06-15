import { useContext } from "react";
import { EmotionContext, defaultEmotionCache } from "..";

export function useEmotionCache() {
  const cache = useContext(EmotionContext)?.cache;
  return cache || defaultEmotionCache;
}
