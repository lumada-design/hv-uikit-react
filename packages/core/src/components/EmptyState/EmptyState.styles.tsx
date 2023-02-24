import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { transientOptions } from "utils/transientOptions";
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
    $breakpoints?: any;
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

export const StyledIconContainer = styled("div")({});

export const StyledTextContainer = styled(
  "div",
  transientOptions
)(({ $breakpoints }: { $breakpoints?: any }) => ({
  background: "transparent",
  maxWidth: "510px",
  overflow: "hidden",
  fontFamily: theme.fontFamily.body,
  [$breakpoints.up("sm")]: {
    marginLeft: theme.space.xs,
  },
  "& a": {
    color: theme.colors.acce2,
    textDecoration: "none",
  },
}));

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(({ $type, $breakpoints }: { $type: string; $breakpoints?: any }) => ({
  ...($type === "title" && {
    marginTop: 4,
    marginBottom: theme.space.xs,
  }),
  ...($type === "text" && {
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    fontFamily: theme.fontFamily.body,
    [$breakpoints.up("sm")]: {
      marginLeft: theme.space.xs,
    },
    "& a": {
      color: theme.colors.acce2,
      textDecoration: "none",
    },
  }),
  ...($type === "action" && {
    marginTop: theme.space.xs,
  }),
}));
