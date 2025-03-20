import type { Rule } from "@unocss/core";
import type { Theme } from "@unocss/preset-wind3";
import { theme as hvCssVars } from "@hitachivantara/uikit-styles";

export const rules: Rule<Theme>[] = [
  ["bg-default", { "background-color": hvCssVars.colors.backgroundColor }],
];
