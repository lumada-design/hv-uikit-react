import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

const name = "HvColorPicker-Fields";

export const { staticClasses, useClasses } = createClasses(name, {
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
});
