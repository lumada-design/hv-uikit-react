import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses } = createClasses("HvColorPickerFields", {
  fields: {
    width: "100%",
    display: "flex",
    paddingTop: "18px",
    marginRight: "0px",
  },
  single: {
    maxWidth: "50px",
    paddingLeft: theme.space.xxs,
    "& input": {
      marginLeft: 5,
      marginRight: 5,
    },
    "& label": {
      paddingLeft: 5,
    },
  },
  double: {
    maxWidth: "82px",
    paddingRight: theme.space.xxs,
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
