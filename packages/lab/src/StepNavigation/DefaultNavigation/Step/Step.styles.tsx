import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvStep", {
  root: {},
  ghost: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&$ghostDisabled": {
      cursor: "default",
    },
    "&$ghostDisabled&:hover": {
      cursor: "default",
    },
  },
  ghostDisabled: {},
  notCurrent: { margin: "-8px" },
  xs: {},
  sm: {},
  md: {},
  lg: {},
  xl: {},
  avatar: {
    "&$xs": {
      fontSize: "0.625rem",
    },
    "&$sm": {
      fontSize: "1rem",
    },
    "&$md": {
      fontSize: "1.5rem",
    },
    "&$lg": {
      fontSize: "2rem",
    },
    "&$xl": {
      fontSize: "2.5rem",
    },
  },
});
