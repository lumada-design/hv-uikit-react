import type { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../../utils/classes";
import { outlineStyles } from "../../../utils/focusUtils";

const item: CSSInterpolation = {
  border: "none",
  cursor: "pointer",
  padding: `${theme.space.xs} ${theme.space.sm}`,
  height: "100%",
  display: "flex",
  alignItems: "center",
  "&:active": {
    outline: "none",
  },
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    ...outlineStyles,
  },
  "& span": {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& span::after": {
    content: "attr(data-text)",
    height: 0,
    visibility: "hidden",
    overflow: "hidden",
    userSelect: "none",
    pointerEvents: "none",
    fontWeight: theme.fontWeights.semibold,

    "@media speech": {
      display: "none",
    },
  },
};

export const { staticClasses, useClasses } = createClasses(
  "HvHeader-MenuItem",
  {
    root: {
      display: "inline",
      "&:hover": {
        backgroundColor: theme.colors.containerBackgroundHover,
      },
      "&:focus-within": {
        backgroundColor: theme.colors.containerBackgroundHover,
      },
    },
    menu: {
      marginTop: 0,
      paddingBottom: "4px",
      paddingTop: "4px",
      height: "100%",
      borderTop: "none",
      borderBottom: `4px solid ${theme.colors.borderDimmed}`,
    },
    menubar: {
      marginTop: "0px",
      paddingBottom: "4px",
      paddingTop: "4px",
      height: "100%",
      borderTop: `0px solid transparent`,
      borderBottom: `4px solid transparent`,
    },
    selected: {
      "&$menu": {
        marginTop: 0,
        paddingBottom: 0,
        borderTop: "none",
        borderBottom: `4px solid ${theme.colors.text}`,
        paddingTop: "4px",
        height: "100%",
        "& > * > span": {
          color: theme.colors.text,
        },
      },
      "&$menubar": {
        marginTop: 0,
        paddingBottom: 0,
        borderTop: "none",
        borderBottom: `4px solid ${theme.colors.text}`,
        paddingTop: "4px",
        height: "100%",
      },
    },
    link: {
      textDecoration: "none",
      ...item,
    } as CSSInterpolation,
    button: {
      color: "inherit",
      ...item,
    } as CSSInterpolation,
  },
);
