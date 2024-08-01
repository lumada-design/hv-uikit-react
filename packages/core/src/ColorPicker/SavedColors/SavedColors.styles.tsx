import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const name = "HvColorPicker-SavedColors";

export const { staticClasses, useClasses } = createClasses(name, {
  addButton: {
    margin: theme.space.xxs,
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
    margin: theme.space.xxs,

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
    background: theme.colors.bgContainer,
    borderRadius: theme.radii.base,
  },
  removeButton: {
    height: 16,
    width: 16,
  },
});
