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
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      "& > [role='button']": {
        backgroundColor: hoverColor,
      },
    },
  },
  themeVariant({
    prop: "selected",
    variants: {
      selectedItem: {
        borderTop: `2px solid ${theme.colors.acce3}`,
        paddingTop: "2px",
        "& > div > p": {
          color: theme.colors.acce3,
        },
      },
      notSelectedItem: {
        marginTop: "4px",
      },
    },
  })
);

export const MenuItemLabel = styled("div")<{ isSelected: boolean }>(
  {
    border: "none",
    cursor: "pointer",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    "&:active": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
      backgroundColor: hoverColor,
    },
    "&.focus-visible": {
      ...outlineStyles,
    },
  },
  themeVariant({
    prop: "isSelected",
    variants: {
      true: {
        "& p": { color: theme.colors.acce3 },
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
  "&.focus-visible": {
    ...outlineStyles,
  },
});
