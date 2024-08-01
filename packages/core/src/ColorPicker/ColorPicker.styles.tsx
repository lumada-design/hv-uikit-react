import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvColorPicker", {
  root: {},
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {},
  description: {},
  headerColorValue: {
    textTransform: "uppercase",
    minWidth: "8ch",
    fontVariant: "tabular-nums",
  },
  headerColorIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    flexShrink: 0,
  },
  panel: {
    width: "100%",
    minWidth: "266px",
    display: "flex",
    justifyContent: "center",
    padding: "16px",
    backgroundColor: "transparent",
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
    "&,& .HvBaseDropdown-arrowContainer": {
      width: 32,
      height: 32,
    },
    "& .HvBaseDropdown-selection": {
      padding: 0,
    },
  },
  headerColorIconOnly: {
    margin: 8,
  },
  pickerFields: { paddingBottom: 20 },
});
