import styled from "@emotion/styled";
import { Breakpoints as MuiBreakpoints } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { transientOptions } from "utils/transientOptions";

export const StyledRoot = styled(
  "footer",
  transientOptions
)(({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  padding: `${theme.space.xs} ${theme.space.sm}`,
  height: 40,
  bottom: 0,
  zIndex: theme.zIndices.base,
  backgroundColor: theme.colors.atmo1,
  boxShadow: `0 -1px 0 ${theme.colors.atmo4}`,
  [$breakpoints.down("sm")]: {
    height: "unset",
    flexDirection: "column",
    padding: theme.space.xs,
  },
}));

export const StyledName = styled(
  HvTypography,
  transientOptions
)(({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
  [$breakpoints.down("sm")]: {
    marginBottom: theme.space.xs,
  },
}));

export const StyledRightContainer = styled(
  "div",
  transientOptions
)(({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  marginLeft: "auto",
  [$breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
    marginLeft: "unset",
  },
}));

export const StyledCopyright = styled(
  HvTypography,
  transientOptions
)(({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
  [$breakpoints.down("sm")]: {
    flexDirection: "column",
    marginBottom: theme.space.xs,
  },
}));

export const StyledSeparator = styled("div")(
  ({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
    width: 1,
    height: 16,
    backgroundColor: theme.colors.acce1,
    margin: `${theme.space.xs} ${theme.space.sm}`,
    [$breakpoints.down("sm")]: {
      display: "none",
    },
  })
);
