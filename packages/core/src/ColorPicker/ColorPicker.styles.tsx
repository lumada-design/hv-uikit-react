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
    width: 24,
    "& svg": {
      marginLeft: 0,
    },
  },
  panel: {
    width: "100%",
    minWidth: "266px",
    display: "flex",
    justifyContent: "center",
    padding: "16px",
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
  headerColorIconOnly: {},
  pickerFields: { paddingBottom: 20 },
});
