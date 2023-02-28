import styled from "@emotion/styled";
import { Breakpoints as MuiBreakpoints } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";

export const StyledRoot = styled(
  "div",
  transientOptions
)(
  ({
    $position,
    $variant,
    $breakpoints,
  }: {
    $position: string;
    $variant: string;
    $breakpoints: MuiBreakpoints;
  }) => ({
    position: "relative",
    ...($position === "sticky" && {
      width: "100%",
      position: "sticky",
    }),
    ...($position === "fixed" && {
      width: "100%",
      position: "fixed",

      [$breakpoints.up("md")]: {
        width: `calc(100% - 2*${theme.spacing(4)}px)`,
        marginLeft: `${theme.spacing(4)}px`,
        marginRight: `${theme.spacing(4)}px`,
      },
      [$breakpoints.down("sm")]: {
        width: `calc(100% - 2*${theme.space.sm}px)`,
        marginLeft: `${theme.space.sm}px`,
        marginRight: `${theme.space.sm}px`,
      },
    }),
    ...($variant === "global" && {
      zIndex: `calc(${theme.zIndices.banner} - 2)`,

      top: 0,
      left: 0,

      "&:before": {
        content: "''",
        display: "flex",
        width: "100%",
        height: 72,
        top: 0,
        background: theme.colors.atmo2,
        opacity: "75%",
      },
      backdropFilter: "blur(1px)",
    }),
  })
);

export const StyledBackButton = styled("div")({
  marginRight: theme.space.xs,
});

export const StyledWrapper = styled(
  "div",
  transientOptions
)(({ $variant }: { $variant: string }) => ({
  height: 52,
  paddingRight: theme.space.xs,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  ...($variant === "global" && {
    position: "absolute",
    top: 0,
    left: 0,
    background: theme.colors.atmo1,
    width: "100%",
    padding: theme.space.xs,
    marginTop: theme.space.xs,
  }),
  ...($variant === "section" && {
    background: "none",
    borderTop: `1px solid ${theme.colors.atmo4}`,
  }),
}));

export const StyledActions = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginLeft: "auto",
  "& > *:not(:first-of-type) ": {
    marginLeft: theme.space.xs,
  },
});
