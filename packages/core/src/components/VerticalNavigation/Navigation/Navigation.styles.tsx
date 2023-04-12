import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import navigationClasses from "./navigationClasses";

export const StyledNav = styled("nav")({
  display: "block",
  background: theme.colors.atmo1,

  overflowY: "auto",

  [`&.${navigationClasses.collapsed}`]: {
    display: "none",
  },

  [`&.${navigationClasses.popup}`]: {
    boxShadow: "inset 5px 0 5px -3px rgb(65 65 65 / 12%)",
  },
});
