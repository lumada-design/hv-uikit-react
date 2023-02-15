import { CSSProperties } from "react";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import CardHeader from "@mui/material/CardHeader";
import { transientOptions } from "utils/transientOptions";

export const StyledHeader = styled(
  CardHeader,
  transientOptions
)(({ $short }: { $short?: boolean }) => ({
  padding: `15px ${theme.spacing(2)}`,
  position: "relative",

  // https://mui.com/material-ui/api/card-header/#css
  "& .MuiCardHeader-title": {
    ...(theme.typography.title3 as CSSProperties),
    fontFamily: theme.fontFamily.body,
    ...($short && { marginRight: "30px" }),
  },
  "& .MuiCardHeader-subheader": {
    fontFamily: theme.fontFamily.body,
    ...(theme.typography.label as CSSProperties),
  },
  "& .MuiCardHeader-action": {
    position: "absolute",
    right: 20,
    marginTop: 0,
    marginRight: "0px",
    paddingLeft: theme.spacing(1),
    top: "15px",
  },
}));
