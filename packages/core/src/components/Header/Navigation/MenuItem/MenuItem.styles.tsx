import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { transientOptions } from "@core/utils/transientOptions";

const { hoverColor } = theme.header;

export const MenuItemLi = styled(
  "li",
  transientOptions
)(({ $selected, $isMenu }: { $selected: boolean; $isMenu: boolean }) => ({
  display: "inline",
  "& span": {
    color: theme.header.color,
  },
  "&:hover": {
    backgroundColor: hoverColor,
  },
  "&:focus-within": {
    backgroundColor: hoverColor,
  },
  ...($selected &&
    $isMenu && {
      borderTop: `${theme.header.secondLevelSelectedItemBorderTopThickness} solid ${theme.header.secondLevelSelectedItemBorderTopColor}`,
      borderBottom: `${theme.header.secondLevelSelectedItemBorderBottomThickness} solid ${theme.header.secondLevelSelectedItemBorderBottomColor}`,
      paddingTop: theme.header.secondLevelSelectedItemBorderBottomThickness,
      height: "100%",
      "&& > * > span": {
        color: theme.header.secondLevelSelectedItemColor,
      },
    }),
  ...($selected &&
    !$isMenu && {
      borderTop: `${theme.header.selectedItemBorderTopThickness} solid ${theme.header.selectedItemBorderTopColor}`,
      borderBottom: `${theme.header.selectedItemBorderBottomThickness} solid ${theme.header.selectedItemBorderBottomColor}`,
      paddingTop: theme.header.selectedItemBorderBottomThickness,
      height: "100%",
      "&& > * > span": {
        color: theme.header.selectedItemColor,
      },
    }),
  ...(!$selected &&
    !$isMenu && {
      marginTop: theme.header.selectedItemBorderTopThickness,
      paddingBottom: theme.header.selectedItemBorderBottomThickness,
      paddingTop: theme.header.selectedItemBorderBottomThickness,
      height: "100%",
      borderTop: `${theme.header.selectedItemBorderTopThickness} solid ${theme.header.backgroundColor}`,
      borderBottom: `${theme.header.selectedItemBorderBottomThickness} solid ${theme.header.backgroundColor}`,
    }),
  ...(!$selected &&
    $isMenu && {
      marginTop: theme.header.secondLevelSelectedItemBorderTopThickness,
      paddingBottom: theme.header.secondLevelSelectedItemBorderBottomThickness,
      paddingTop: theme.header.secondLevelSelectedItemBorderBottomThickness,
      height: "100%",
      borderTop: `${theme.header.secondLevelSelectedItemBorderTopThickness} solid ${theme.header.secondLevelBackgroundColor}`,
      borderBottom: `${theme.header.secondLevelSelectedItemBorderBottomThickness} solid ${theme.header.secondLevelBackgroundColor}`,
      "&& > * > span": {
        color: theme.header.secondLevelItemColor,
      },
    }),
}));

export const MenuItemLabel = styled(
  "div",
  transientOptions
)(({ $isSelected, $isMenu }: { $isSelected?: boolean; $isMenu?: boolean }) => ({
  border: "none",
  cursor: "pointer",
  padding: `${theme.space.xs} ${theme.space.sm}`,
  height: "100%",
  display: "flex",
  alignItems: "center",
  color: "inherit",
  "&:active": {
    outline: "none",
  },
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    ...outlineStyles,
  },

  "&& span": {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    ...($isSelected && {
      borderRadius: theme.radii.full,
      padding: theme.space.xs,
      ...(!$isMenu && {
        color: theme.header.selectedItemColor,
        backgroundColor: theme.header.selectedItemBackgroundColor,
      }),
      ...($isMenu && {
        color: theme.header.secondLevelSelectedItemColor,
        backgroundColor: theme.header.secondLevelSelectedItemBackgroundColor,
      }),
    }),
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
}));

export const MenuItemLink = styled("a")(
  ({ $isSelected, $isMenu }: { $isSelected?: boolean; $isMenu?: boolean }) => ({
    border: "none",
    cursor: "pointer",
    padding: `${theme.space.xs} ${theme.space.sm}`,
    height: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    "&:active": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
    ...($isSelected && {
      "& > div > span": {
        ...(!$isMenu && {
          color: theme.header.selectedItemColor,
        }),
        ...($isMenu && {
          color: theme.header.secondLevelSelectedItemColor,
        }),
      },
    }),
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
  })
);
