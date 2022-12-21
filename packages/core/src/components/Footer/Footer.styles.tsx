import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

import { Typography } from "components/Typography";

export const StyledRoot = styled("footer")(
  ({ breakpoints }: { breakpoints?: any }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    height: 40,
    bottom: 0,
    zIndex: theme.zIndices.base,
    backgroundColor: theme.colors.atmo1,
    boxShadow: `0 -1px 0 ${theme.colors.atmo4}`,
    [breakpoints.down("sm")]: {
      height: "unset",
      flexDirection: "column",
      padding: theme.spacing(1),
    },
  })
);

export const StyledName = styled(Typography)(
  ({ breakpoints }: { breakpoints?: any }) => ({
    [breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
  })
);

export const StyledRightContainer = styled("div")(
  ({ breakpoints }: { breakpoints?: any }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
    [breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
      marginLeft: "unset",
    },
  })
);

export const StyledCopyright = styled(Typography)(
  ({ breakpoints }: { breakpoints?: any }) => ({
    [breakpoints.down("sm")]: {
      flexDirection: "column",
      marginBottom: theme.spacing(1),
    },
  })
);

export const StyledSeparator = styled("div")(
  ({ breakpoints }: { breakpoints?: any }) => ({
    width: 1,
    height: 16,
    backgroundColor: theme.colors.acce1,
    margin: `${theme.spacing(1)} ${theme.spacing(2)}`,
    [breakpoints.down("sm")]: {
      display: "none",
    },
  })
);
