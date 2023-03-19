import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { outlineStyles } from "utils";
import actionClasses from "./actionClasses";

const hover = () => ({
  background: theme.verticalNavigation.hoverColor,
  "& *": {
    background: theme.verticalNavigation.hoverColor,
  },
});

export const StyledAction = styled(HvTypography)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "32px",
  color: theme.colors.acce1,

  // hover
  "&:hover": hover(),

  "&:focus": {
    outline: "none",
    ...hover(),
  },

  "&:focus-visible": {
    ...outlineStyles,
  },

  // cursor
  cursor: "pointer",
  "& *": {
    cursor: "pointer",
  },

  [`& .${actionClasses.noIcon}`]: {
    paddingLeft: theme.space.xs,
  },

  [`&.${actionClasses.minimized}`]: {
    justifyContent: "center",
    paddingRight: 0,
  },
});
