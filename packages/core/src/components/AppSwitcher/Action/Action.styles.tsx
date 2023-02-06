import styled from "@emotion/styled";
import { HvListItem, HvTypography } from "components";
import { theme } from "@hitachivantara/uikit-styles";
import { Info } from "@hitachivantara/uikit-icons";
import appSwitcherActionClasses from "./actionClasses";

export const StyledListItem = styled(HvListItem)({
  width: "100%",
  maxWidth: 280,
  minHeight: 52,
  marginRight: theme.spacing(2),
});

export const StyledTypography = styled(HvTypography)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",

  width: "100%",
  minHeight: 52,

  padding: `6px ${theme.spacing(1)}`,

  border: "none",
  borderLeft: `solid 2px ${theme.colors.acce1}`,

  cursor: "pointer",

  textDecoration: "inherit",
  color: "inherit",
  backgroundColor: "inherit",

  [`.${appSwitcherActionClasses.disabled} &`]: {
    cursor: "not-allowed",
  },
}));

export const StyledImg = styled("img")({
  width: 32,
});

export const StyledIconInfo = styled(Info)({
  minWidth: 32,
});

export const StyledIcon = styled("div")({
  display: "flex",
  minWidth: 40,
  justifyContent: "center",
});
