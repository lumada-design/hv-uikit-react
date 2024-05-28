import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const name = "HvColorPicker-SavedColors";

export const { staticClasses, useClasses } = createClasses(name, {
  addButton: {
    margin: "4px",
    width: "32px",
    height: "32px",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    alignItems: "center",
    padding: 0,
    width: "calc(100% + 8px)",
    margin: "-4px -4px",
  },
  swatchRoot: { position: "relative" },
  swatchWrap: {
    width: "32px",
    height: "32px",
    margin: "4px",

    "& > span > div": {
      borderRadius: theme.radii.base,
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
    background: theme.colors.bgSurface,
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
