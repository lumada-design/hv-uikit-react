import styled from "@emotion/styled";
import { theme, themeVariant } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "components/Focus/Focus.Styles";

const hoverColor = theme.colors.atmo3;

export const MenuItemLi = styled("li")<{ selected: string }>(
  {
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
  },
  themeVariant({
    prop: "selected",
    variants: {
      selectedItem: {
        borderTop: `${theme.header.selectedItemBorderTopThickness} solid ${theme.header.selectedItemBorderTopColor}`,
        borderBottom: `${theme.header.selectedItemBorderBottomThickness} solid ${theme.header.selectedItemBorderBottomColor}`,
        paddingTop: theme.header.selectedItemBorderBottomThickness,
        height: "100%",
        "& > div > p": {
          color: theme.header.color,
        },
      },
      notSelectedItem: {
        marginTop: theme.header.selectedItemBorderTopThickness,
        marginBottom: theme.header.selectedItemBorderBottomThickness,
        paddingTop: theme.header.selectedItemBorderBottomThickness,
        height: `calc(100% - 4px)`,
      },
    },
  })
);

export const MenuItemLabel = styled("div")<{ isSelected: boolean }>(
  {
    border: "none",
    cursor: "pointer",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
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
  },
  themeVariant({
    prop: "isSelected",
    variants: {
      true: {
        "& p": { color: theme.header.color },
      },
    },
  })
);

export const MenuItemLink = styled("a")({
  border: "none",
  cursor: "pointer",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  display: "block",
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
});
