import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@core/utils";

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
    minWidth: theme.colorPicker.panelMinWidth,
    display: "flex",
    justifyContent: "center",
    padding: theme.colorPicker.panelPadding,
  },
  colorPicker: {
    width: theme.colorPicker.colorPickerWidth,
  },
  colorPickerIcon: {},
  recommendedColorsRoot: {},
  dropdownRootIconOnly: {
    width: 32,
    height: 32,
  },
  headerColorIconOnly: {},
  pickerFields: { paddingBottom: 20 },
});
