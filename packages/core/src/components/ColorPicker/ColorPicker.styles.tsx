import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvColorPickerClasses } from "./colorPickerClasses";

export const styles: Partial<
  Record<keyof HvColorPickerClasses, CSSInterpolation>
> = {
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
    cursor: "pointer",
  },
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
  dropdownRootIconOnly: {
    width: 32,
    height: 32,
  },
  headerColorIconOnly: {},
  pickerFields: { paddingBottom: 20 },
};
