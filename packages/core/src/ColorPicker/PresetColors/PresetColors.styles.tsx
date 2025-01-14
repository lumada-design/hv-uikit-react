import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const name = "HvColorPicker-PresetColors";

export const { staticClasses, useClasses } = createClasses(name, {
  root: { width: "232px" },
  colors: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    width: "calc(100% + 8px)",
    margin: "-4px -4px",
    padding: 0,
  },
  title: {
    fontWeight: theme.fontWeights.semibold,
    marginBottom: 8,
  },
  swatchWrap: {
    width: "32px",
    height: "32px",
    margin: theme.space.xxs,

    "& > span > div": {
      borderRadius: theme.radii.base,
    },
  },
});
