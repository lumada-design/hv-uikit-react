import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-react-core";
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
    border: theme.colorPicker.panelBorder,
    borderRadius: theme.colorPicker.panelBorderRadius,
  },
  colorPicker: {
    width: theme.colorPicker.colorPickerWidth,
  },
  colorPickerIcon: {
    position: "absolute",
    pointerEvents: "none",
    top: -1,
    right: -1,
  },
  dropdownRootIconOnly: {
    width: 32,
    height: 32,
  },
  headerColorIconOnly: {
    position: "absolute",
    pointerEvents: "none",
    top: -1,
    right: -1,
    width: 32,
    height: 32,
  },
  pickerFields: { paddingBottom: 20 },
};
