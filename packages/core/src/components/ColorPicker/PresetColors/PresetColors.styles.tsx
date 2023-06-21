import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";

const name = "HvColorPicker-PresetColors";

export const { staticClasses, useClasses } = createClasses(name, {
  root: { width: theme.colorPicker.recommendedColorsRootWidth },
  colors: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    width: theme.colorPicker.recommendedColorsWidth,
    margin: theme.colorPicker.recommendedColorsMargin,
    padding: 0,
  },
  title: {
    fontWeight: theme.fontWeights.semibold,
    marginBottom: 8,
  },
  swatchWrap: {
    width: theme.colorPicker.recommendedColorsSwatchWidth,
    height: theme.colorPicker.recommendedColorsSwatchHeight,
    margin: theme.colorPicker.recommendedColorsSwatchMargin,

    "& > span > div": {
      borderRadius: theme.colorPicker.recommendedColorsSwatchBorderRadius,
    },
  },
});
