import { boxShadow } from "../../styles";
import "focus-within-polyfill";

const styles = theme => {
  const show = {
    top: 46,
    transition: ["top"],
    ...boxShadow(theme.hv.palette.accent.acce1),
    transitionDuration: 500
  };

  const hide = {
    top: 0,
    transition: ["top"],
    boxShadow: "none",
    transitionDuration: 300
  };

  return {
    root: {
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center"
    },
    menubar: {
      position: "relative",
      height: 46,
      backgroundColor: theme.hv.palette.atmosphere.atmo1
    },
    menu: {
      position: "absolute",
      height: 2 * theme.hv.spacing.sm,
      zIndex: -1,
      backgroundColor: theme.hv.palette.atmosphere.atmo3
    },
    hidden: {
      ...hide,
      "& li": {
        marginTop: -2
      },
      "& li > div": {
        height: 2 * theme.hv.spacing.sm,
        "& p": {
          marginTop: 3
        }
      }
    },
    active: {
      ...show
    },
    list: {
      margin: 0,
      padding: 0,
      display: "inherit",
      "&:hover $active": {
        ...hide
      },
      "& li:hover > $hidden": {
        ...show
      },

      // IE fallback code (using focus-within-polyfill)
      "&.focus-within $active": {
        ...hide
      },
      "& li.focus-within > $hidden": {
        ...show
      },

      "&:focus-within $active": {
        ...hide
      },
      "& li:focus-within> $hidden": {
        ...show
      }
    }
  };
};

export default styles;
