import { createClasses } from "@core/utils/classes";

const name = "HvColorPicker-Fields";

export const { staticClasses, useClasses } = createClasses(name, {
  fields: {
    width: "100%",
    display: "flex",
    paddingTop: "18px",
    marginRight: "0px",
  },
  single: {
    maxWidth: "50px",
    paddingLeft: "4px",
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
    paddingRight: "4px",
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
