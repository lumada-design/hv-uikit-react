import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Typography } from "components/Typography";

export const StyledRoot = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
});

export const StyledContainer = styled("div")(
  ({ messageOnly }: { messageOnly: boolean }) => ({
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    ...(messageOnly && {
      alignItems: "center",
      [theme.breakpoints.only("xs")]: {
        flexDirection: "row",
      },
      "& .textContainer": {
        marginLeft: 0,
      },
    }),
  })
);

export const StyledIconContainer = styled("div")({});

export const StyledTextContainer = styled("div")({
  background: "transparent",
  maxWidth: "510px",
  overflow: "hidden",
  fontFamily: theme.fontFamily.body,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
  },
  "& a": {
    color: theme.colors.acce2,
    textDecoration: "none",
  },
});

export const StyledTypography = styled(Typography)(
  ({ type }: { type: string }) => ({
    ...(type === "title" && {
      marginTop: 4,
      marginBottom: theme.spacing(1),
    }),
    ...(type === "text" && {
      background: "transparent",
      maxWidth: "510px",
      overflow: "hidden",
      fontFamily: theme.fontFamily.body,
      [theme.breakpoints.up("sm")]: {
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
