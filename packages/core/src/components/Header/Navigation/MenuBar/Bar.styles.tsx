import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

const show = {
  top: `calc(${theme.header.height} - ${theme.header.borderTopThickness})`,
  transition: ["top"],
  boxShadow: theme.header.shadow,
  transitionDuration: "500ms",
  backgroundColor: theme.header.secondLevelBackgroundColor,
};

const hide = {
  top: 0,
  transition: ["top"],
  boxShadow: "none",
  transitionDuration: "300ms",
};

export const { staticClasses, useClasses } = createClasses("HvHeader-MenuBar", {
  root: {
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    zIndex: -2,
    height: "56px",
    backgroundColor: theme.header.secondLevelBackgroundColor,
    "& li > div": {
      marginTop: 0,
    },
  },
  menubar: {
    position: "relative",
    backgroundColor: theme.header.backgroundColor,
  },
  hidden: { ...hide },
  active: { ...show },
  list: {
    margin: 0,
    padding: 0,
    display: "inherit",
    alignItems: "center",
    height: "100%",
    "&:hover $active": {
      ...hide,
    },
    "& li:hover > $hidden": {
      ...show,
    },

    "&:focus-within $active": {
      ...hide,
      zIndex: -2,
    },
    "& li:focus-within > $hidden": {
      ...show,
      zIndex: -1,
    },
  },
});
