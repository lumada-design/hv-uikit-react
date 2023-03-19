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
});
