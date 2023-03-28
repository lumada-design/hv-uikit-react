import { CSSInterpolation } from "@emotion/css";

export const createClasses = (
  css: (...args: CSSInterpolation[]) => string
) => ({
  root: css({ width: "100%" }),
});
