import { theme } from "@hitachivantara/uikit-styles";

import { CSSInterpolation } from "@emotion/css";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

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
      marginTop: theme.header.secondLevelSelectedItemBorderTopThickness,
      paddingBottom: theme.header.secondLevelSelectedItemBorderBottomThickness,
      paddingTop: theme.header.secondLevelSelectedItemBorderBottomThickness,
      height: "100%",
      borderTop: `${theme.header.secondLevelSelectedItemBorderTopThickness} solid ${theme.header.secondLevelBackgroundColor}`,
      borderBottom: `${theme.header.secondLevelSelectedItemBorderBottomThickness} solid ${theme.header.secondLevelBackgroundColor}`,
    },
    menubar: {
      marginTop: theme.header.selectedItemBorderTopThickness,
      paddingBottom: theme.header.selectedItemBorderBottomThickness,
      paddingTop: theme.header.selectedItemBorderBottomThickness,
      height: "100%",
      borderTop: `${theme.header.selectedItemBorderTopThickness} solid ${theme.header.backgroundColor}`,
      borderBottom: `${theme.header.selectedItemBorderBottomThickness} solid ${theme.header.backgroundColor}`,
    },
    selected: {
      "&$menu": {
        marginTop: 0,
        paddingBottom: 0,
        borderTop: `${theme.header.secondLevelSelectedItemBorderTopThickness} solid ${theme.header.secondLevelSelectedItemBorderTopColor}`,
        borderBottom: `${theme.header.secondLevelSelectedItemBorderBottomThickness} solid ${theme.header.secondLevelSelectedItemBorderBottomColor}`,
        paddingTop: theme.header.secondLevelSelectedItemBorderBottomThickness,
        height: "100%",
        "& > * > span": {
          color: theme.colors.secondary,
        },
      },
      "&$menubar": {
        marginTop: 0,
        paddingBottom: 0,
        borderTop: `${theme.header.selectedItemBorderTopThickness} solid ${theme.header.selectedItemBorderTopColor}`,
        borderBottom: `${theme.header.selectedItemBorderBottomThickness} solid ${theme.header.selectedItemBorderBottomColor}`,
        paddingTop: theme.header.selectedItemBorderBottomThickness,
        height: "100%",
      },
    },
    link: {
      textDecoration: "none",
      ...item,
    },
    button: {
      color: "inherit",
      ...item,
    },
  }
);
