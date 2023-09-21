import { defineConfig, presetAttributify, presetMini } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";
import {
  colors,
  breakpoints,
  space,
  radii,
  zIndices,
} from "@hitachivantara/uikit-styles";

const mappedBreakpoints = Object.entries(breakpoints.values).map(
  ([key, value]) => [key, `${value}px`] as const
);

const mappedZIndices = Object.entries(zIndices).map(
  ([key, value]) => [key, `${value}`] as const
);

const { base, ...spacing } = space;

export default defineConfig({
  presets: [
    presetMini(),
    presetAttributify(),
    // align with UI Kit `base`. Default uses `rem` & base is 1/4 of fontSize
    // @ts-ignore
    presetRemToPx({ baseFontSize: 32 }),
  ],
  rules: [
    [
      /bg-default/,
      () => ({ "background-color": "var(--uikit-colors-backgroundColor)" }),
    ],
  ],
  theme: {
    colors: {
      ...colors.common,
      ...colors.light,
    },
    breakpoints: Object.fromEntries(mappedBreakpoints),
    spacing,
    borderRadius: radii,
    zIndex: Object.fromEntries(mappedZIndices),
    fontFamily: {
      sans: ["'Open Sans'", "sans-serif"],
      mono: ["monospace"],
    },
  },
});
