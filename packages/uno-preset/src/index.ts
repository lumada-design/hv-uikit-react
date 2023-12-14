import { UserConfig, definePreset, mergeConfigs } from "@unocss/core";
import { Theme, presetUno, PresetUnoOptions } from "@unocss/preset-uno";
import { presetRemToPx } from "@unocss/preset-rem-to-px";

import { presetTheme } from "unocss-preset-theme";

import { extendTheme, themeModes } from "./theme";
import { rules } from "./rules";

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
