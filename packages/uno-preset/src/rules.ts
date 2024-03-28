import type { Rule } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";
import { theme as hvCssVars } from "@hitachivantara/uikit-styles";

export const rules: Rule<Theme>[] = [
  ["bg-default", { "background-color": hvCssVars.colors.backgroundColor }],
];
