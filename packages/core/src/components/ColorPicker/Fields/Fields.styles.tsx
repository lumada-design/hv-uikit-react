import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvColorPickerFieldsClasses } from "./fieldsClasses";

export const styles: Partial<
  Record<keyof HvColorPickerFieldsClasses, CSSInterpolation>
> = {
  fields: {
    width: "100%",
    display: "flex",
    paddingTop: theme.colorPicker.fieldsPaddingTop,
    marginRight: theme.colorPicker.fieldsMarginRight,
  },
  single: {
    maxWidth: theme.colorPicker.fieldsRgbWidth,
    paddingLeft: theme.colorPicker.fieldsRgbPaddingLeft,
    "& input": {
      marginLeft: 5,
      marginRight: 5,
    },
    "& label": {
      paddingLeft: 5,
    },
  },
  double: {
    maxWidth: theme.colorPicker.fieldsHexWidth,
    paddingRight: theme.colorPicker.fieldsHexPaddingRight,
    "& input": {
      textTransform: "uppercase",
      marginLeft: 5,
      marginRight: 5,
    },
    "& label": {
      paddingLeft: 5,
    },
  },
};
