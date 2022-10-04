import { themeVars } from "./themeVars";

export const themeUtils = {
  space: (factor: number): string =>
    `calc(${themeVars.space.base} * ${factor}px)`,
};
