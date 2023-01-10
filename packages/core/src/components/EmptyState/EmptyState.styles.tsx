import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";

export const StyledRoot = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
});

export const StyledContainer = styled("div")(
  ({
    messageOnly,
    breakpoints,
  }: {
    messageOnly: boolean;
    breakpoints?: any;
  }) => ({
    display: "flex",
    flexDirection: "row",
    [breakpoints.only("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    ...(messageOnly && {
      alignItems: "center",
      [breakpoints.only("xs")]: {
        flexDirection: "row",
      },
      "& .textContainer": {
        marginLeft: 0,
      },
    }),
  })
);

export const StyledIconContainer = styled("div")({});

export const StyledTextContainer = styled("div")(
  ({ breakpoints }: { breakpoints?: any }) => ({
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    fontFamily: theme.fontFamily.body,
    [breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
    },
    "& a": {
      color: theme.colors.acce2,
      textDecoration: "none",
    },
  })
);

export const StyledTypography = styled(HvTypography)(
  ({ type, breakpoints }: { type: string; breakpoints?: any }) => ({
    ...(type === "title" && {
      marginTop: 4,
      marginBottom: theme.spacing(1),
    }),
    ...(type === "text" && {
      background: "transparent",
      maxWidth: "510px",
      overflow: "hidden",
      fontFamily: theme.fontFamily.body,
      [breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
      },
      "& a": {
        color: theme.colors.acce2,
        textDecoration: "none",
      },
    }),
    ...(type === "action" && {
      marginTop: theme.spacing(1),
    }),
  })
);
