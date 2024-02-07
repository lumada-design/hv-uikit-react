import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvColorPicker", {
  root: {},
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
    cursor: "pointer",
  },
  description: {},
  headerColorValue: {
    textTransform: "uppercase",
  },
  headerColorIcon: {
    width: 16,
    height: 16,
    margin: theme.space.xs,
    marginLeft: 0,
  },
  panel: {
    width: "100%",
    minWidth: "266px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.space.sm,
  },
  colorPicker: {
    width: "232px",
  },
  colorPickerIcon: {},
  recommendedColorsRoot: {
    ":not(:only-child)": {
      paddingBottom: "24px",
    },
  },
  dropdownRootIconOnly: {
    width: 32,
    height: 32,
  },
  headerColorIconOnly: {
    width: 16,
    height: 16,
    margin: theme.space.xs,
  },
  pickerFields: { paddingBottom: 20 },
});
