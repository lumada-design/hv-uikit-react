import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";

const hoverColor = theme.header.hoverColor;

export const MenuItemLi = styled(
  "li",
  transientOptions
)(({ $selected }: { $selected?: string }) => ({
  display: "inline",
  "&:hover": {
    "& > [role='button']": {
      backgroundColor: hoverColor,
    },
    "&:focus-within": {
      "& > [role='button']": {
        backgroundColor: hoverColor,
      },
    },
  },
  ...($selected === "selectedItem" && {
    borderTop: `${theme.header.selectedItemBorderTopThickness} solid ${theme.header.selectedItemBorderTopColor}`,
    borderBottom: `${theme.header.selectedItemBorderBottomThickness} solid ${theme.header.selectedItemBorderBottomColor}`,
    paddingTop: theme.header.selectedItemBorderBottomThickness,
    height: "100%",
    "& > div > label": {
      color: theme.header.color,
    },
  }),
  ...($selected === "notSelectedItem" && {
    marginTop: theme.header.selectedItemBorderTopThickness,
    marginBottom: theme.header.selectedItemBorderBottomThickness,
    paddingTop: theme.header.selectedItemBorderBottomThickness,
    height: `calc(100% - 4px)`,
  }),
}));

export const MenuItemLabel = styled(
  "div",
  transientOptions
)(({ $isSelected }: { $isSelected?: boolean }) => ({
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
    backgroundColor: hoverColor,
  },
  "&:focus-visible": {
    ...outlineStyles,
  },
  ...($isSelected && {
    "& span": { color: theme.header.color },
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
}));

export const MenuItemLink = styled("a")(
  ({ $isSelected }: { $isSelected?: boolean }) => ({
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
      backgroundColor: hoverColor,
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
    ...($isSelected && {
      "& span": { color: theme.header.color },
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
