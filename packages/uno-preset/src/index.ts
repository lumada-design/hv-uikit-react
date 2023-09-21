import { definePreset } from "@unocss/core";
import { Theme, presetUno, PresetUnoOptions } from "@unocss/preset-uno";

import { extendTheme } from "./theme";
import { rules } from "./rules";
import { remToPx } from "./utils";

export { remToPx, rules, extendTheme };

export interface HvUnoOptions extends PresetUnoOptions {}

export const presetHv = definePreset<HvUnoOptions, Theme>((options) => {
  const basePreset = presetUno(options);

  return {
    ...basePreset,
    name: "@hitachivantara/uikit-uno-preset",
    postprocess: [remToPx()],
    extendTheme,
    rules: [...basePreset.rules!, ...rules],
  };
});
