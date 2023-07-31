import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

const name = "HvColorPicker-SavedColors";

export const { staticClasses, useClasses } = createClasses(name, {
  addButton: {
    margin: theme.colorPicker.addSavedColorButtonMargin,
    width: theme.colorPicker.addSavedColorButtonWidth,
    height: theme.colorPicker.addSavedColorButtonHeight,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    alignItems: "center",
    padding: 0,
    width: theme.colorPicker.savedColorsWidth,
    margin: theme.colorPicker.savedColorsMargin,
  },
  swatchRoot: { position: "relative" },
  swatchWrap: {
    width: theme.colorPicker.savedColorsSwatchWidth,
    height: theme.colorPicker.savedColorsSwatchHeight,
    margin: theme.colorPicker.savedColorsSwatchMargin,

    "& > span > div": {
      borderRadius: theme.colorPicker.savedColorsSwatchBorderRadius,
    },
  },
  removeButtonRoot: {
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 16,
    width: 16,
    background: theme.colors.atmo1,
    borderRadius: theme.radii.base,
  },
  removeButton: {
    height: 16,
    width: 16,
    minWidth: 16,
    minHeight: 16,
    padding: 0,
    margin: 0,

    "& div > span": {
      height: 16,
      width: 16,

      "& > div": { height: 16, width: 16 },
    },
  },
});
