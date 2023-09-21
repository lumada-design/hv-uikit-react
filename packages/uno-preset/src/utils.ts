import type { Postprocessor } from "@unocss/core";

/** Matches `rem` & `em` */
const remRE = /(-?[.\d]+)rem/g;
/** align with UI Kit `base`. Default uses `rem` & base is 1/4 of fontSize */
const pxMultiplier = 32;

/**
 * Converts rem to px for all utilities and scales up to 8px unit.
 *
 * Needed because NEXT DS uses px and UnoCSS uses a 4px unit base (instead of 8px)
 * based on https://unocss.dev/presets/rem-to-px
 */
export const remToPx = (): Postprocessor => (util) => {
  util.entries.forEach((entry) => {
    const [, value] = entry;
    if (typeof value === "string" && remRE.test(value)) {
      entry[1] = value.replace(remRE, (_, v) => `${v * pxMultiplier}px`);
    }
  });
};
