import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";
import { CSSProperties } from "react";

const name = "HvColorPicker-Picker";

export const { staticClasses, useClasses } = createClasses(name, {
  pickers: {
    display: "flex",
    flexDirection: theme.colorPicker
      .pickersFlexDirection as CSSProperties["flexDirection"],
  },
  saturation: {
    width: theme.colorPicker.saturationWidth,
    height: theme.colorPicker.saturationHeight,
    marginRight: theme.colorPicker.saturationMarginRight,
    position: "relative",
    overflow: "visible",

    "& > div": {
      borderRadius: theme.colorPicker.saturationBorderRadius,

      "& .saturation-white": {
        borderRadius: theme.colorPicker.saturationBorderRadius,

        "& .saturation-black": {
          borderRadius: theme.colorPicker.saturationBorderRadius,
        },
      },
    },
  },
  saturationPointer: {
    width: theme.colorPicker.saturationPointerWidth,
    height: theme.colorPicker.saturationPointerHeight,
    boxShadow: `0 0 0 2px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
    borderRadius: "50%",
    transform: "translate(-3px, -3px)",
  },
  hue: {
    height: theme.colorPicker.hueHeight,
    width: theme.colorPicker.hueWidth,
    position: "relative",
    overflow: "visible",
    marginTop: theme.colorPicker.hueMarginTop,

    "& .hue-horizontal": {
      borderRadius: theme.colorPicker.hueBorderRadius,
    },
  },
  hueSlider: {
    width: theme.colorPicker.hueSliderWidth,
    height: theme.colorPicker.hueSliderHeight,
    background: theme.colorPicker.hueSliderBackground,
    boxShadow: "0 0 2px rgb(0 0 0 / 60%)",
    marginLeft: theme.colorPicker.hueSliderMarginLeft,
    border: theme.colorPicker.hueSliderBorder,
    borderRadius: theme.colorPicker.hueSliderBorderRadius,
    transform: "translate(0, -2px)",
  },
  title: {
    fontWeight: theme.fontWeights.semibold,
    marginBottom: 8,
  },
  fields: {},
});
