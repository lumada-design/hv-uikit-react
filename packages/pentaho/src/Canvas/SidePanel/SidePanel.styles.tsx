import { createClasses, theme } from "@hitachivantara/uikit-react-core";

const boxShadow = `4px 0px 8px -4px ${theme.alpha("base_dark", "12%")}`;

export const { staticClasses, useClasses } = createClasses(
  "HvCanvasSidePanel",
  {
    root: {
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      boxShadow,
      backgroundColor: "transparent",
      transition: "visibility 0.3s ease, width 0.3s ease",
      overflow: "hidden",
      "&$open": {
        width: 320,
        visibility: "visible",
      },
      "&$close": {
        width: 0,
        visibility: "hidden",
      },
    },
    tabs: {},
    content: {
      height: "100%",
    },
    handle: {
      height: "172px",
      width: "35px",
      display: "flex",
      justifyContent: "center",
      boxShadow,
      backgroundColor: theme.colors.atmo1,
      borderRadius: "0px 16px 16px 0px",
      position: "absolute",
      transition: "left 0.3s ease",
      top: "calc(50% - 86px)",
      "&$handleOpen": {
        left: 320,
      },
      "&$handleClose": {
        left: 0,
      },
    },
    open: {},
    close: {},
    handleOpen: {},
    handleClose: {},
  },
);
