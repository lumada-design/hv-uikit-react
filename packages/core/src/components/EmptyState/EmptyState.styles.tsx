import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { Breakpoints as MuiBreakpoints } from "@mui/material";

import { HvTypography } from "@core/components/Typography";
import { transientOptions } from "@core/utils/transientOptions";

import emptyStateClasses from "./emptyStateClasses";

export const StyledRoot = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
});

export const StyledContainer = styled(
  "div",
  transientOptions
)(
  ({
    $messageOnly,
    $breakpoints,
  }: {
    $messageOnly: boolean;
    $breakpoints: MuiBreakpoints;
  }) => ({
    display: "flex",
    flexDirection: "row",
    [$breakpoints.only("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    ...($messageOnly && {
      alignItems: "center",
      [$breakpoints.only("xs")]: {
        flexDirection: "row",
      },
      [`& .${emptyStateClasses.textContainer}`]: {
        marginLeft: 0,
      },
    }),
  })
);

export const StyledTextContainer = styled(
  "div",
  transientOptions
)(({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
  background: "transparent",
  maxWidth: "510px",
  overflow: "hidden",
  [$breakpoints.up("sm")]: {
    marginLeft: theme.space.xs,
  },
  "& a": {
    color: theme.colors.primary,
    textDecoration: "none",
  },
}));

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(({ $type }: { $type: "title" | "message" | "action" }) => ({
  ...($type === "title" && {
    marginTop: theme.emptyState.titleMarginTop,
    marginBottom: theme.space.sm,
  }),
  ...($type === "action" && {
    marginTop: theme.space.sm,
  }),
}));
