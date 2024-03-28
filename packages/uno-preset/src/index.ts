import { definePreset, mergeConfigs, UserConfig } from "@unocss/core";
import { presetRemToPx } from "@unocss/preset-rem-to-px";
import { presetUno, PresetUnoOptions, Theme } from "@unocss/preset-uno";
import { presetTheme } from "unocss-preset-theme";

import { rules } from "./rules";
import { extendTheme, themeModes } from "./theme";

export { rules, extendTheme, themeModes };

export interface HvUnoOptions extends PresetUnoOptions {}

export const presetHv = definePreset<HvUnoOptions, Theme>((options) => {
  /** HV base theme configuration */
  const hvConfig: UserConfig<Theme> = {
    extendTheme,
    rules,
  };

  return {
    name: "@hitachivantara/uikit-uno-preset",
    ...mergeConfigs([
      // base uno config
      presetUno(options),
      // allows theme variants (light/dark) via CSS vars - aligned with UI Kit's
      presetTheme<Theme>({ prefix: "--hv", theme: themeModes }),
      // convert rem to px & make 1 unit 8px (32px = 1rem => 1/4rem = 8px)
      presetRemToPx({ baseFontSize: 32 }),

      hvConfig,
    ]),
  };
});
