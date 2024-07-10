import {
  createClasses,
  outlineStyles,
  theme,
} from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvCanvasPanel", {
  root: {
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    boxShadow: "4px 0px 8px -4px color-mix(in srgb, #414141 12%, transparent)",
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
    backgroundColor: theme.colors.atmo1,
    height: "100%",
    padding: theme.space.md,
  },
  handle: {
    height: 172,
    width: 35,
    display: "flex",
    justifyContent: "center",
    boxShadow: "4px 0px 8px -4px color-mix(in srgb, #414141 12%, transparent)",
    backgroundColor: theme.colors.atmo1,
    borderRadius: `0 ${theme.radii.round} ${theme.radii.round} 0`,
    position: "absolute",
    transition: "left 0.3s ease",
    top: "calc(50% - 86px)",
    "&$handleOpen": {
      left: 320,
    },
    "&$handleClose": {
      left: 0,
    },
    "&:hover": {
      cursor: "pointer",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
  handleButton: {
    top: "calc(50% - 16px)",
    position: "absolute",
  },
  open: {},
  close: {},
  handleOpen: {},
  handleClose: {},
});
