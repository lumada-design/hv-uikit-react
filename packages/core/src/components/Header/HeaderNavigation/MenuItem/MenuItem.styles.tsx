import styled from "@emotion/styled";
import { themeUtils, themeVariant, themeVars } from "theme";

export const MenuItemLi = styled("li")<{ selected: string }>(
  {
    display: "inline",
    "&:hover": {
      "& > [role='button']": {
        backgroundColor: themeVars.colors.atmo3,
      },
    },
  },
  themeVariant({
    prop: "selected",
    variants: {
      selectedItem: {
        borderTop: `2px solid ${themeVars.colors.acce3}`,
        paddingTop: "2px",
        "& > div > p": {
          color: themeVars.colors.acce3,
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
    // classes from classes.button on original code
    border: "none",
    cursor: "pointer",
    padding: themeUtils.space(1),
  },
  themeVariant({
    prop: "isSelected",
    variants: {
      true: {
        "& p": { color: themeVars.colors.acce3 },
      },
    },
  })
);

export const MenuItemLink = styled("a")({
  // classes from classes.button on original code
  border: "none",
  cursor: "pointer",
  padding: themeUtils.space(1),
  // classes from classes.link on original code
  display: "block",
  textDecoration: "none",
});
