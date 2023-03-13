import createCache from "@emotion/cache";
import createEmotion from "@emotion/css/create-instance";

/**
 * Moves UI Kit styles to the top of the <head> so they're loaded first.
 * This enables users to override the UI Kit styles if necessary.
 */

const key: string = "hv-uikit";

export const emotionCache = createCache({
  key: `${key}-style`,
  prepend: true,
});

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = createEmotion({
  key: `${key}-css`,
  prepend: true,
});
