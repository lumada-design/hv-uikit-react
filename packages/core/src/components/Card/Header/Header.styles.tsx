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
    color: "#414141",
    fontSize: "18px",
    letterSpacing: "0.02em",
    lineHeight: "28px",
    fontWeight: 600,
    fontFamily: theme.fontFamily.body,
    ...($short && { marginRight: "30px" }),
  },
  "& .MuiCardHeader-subheader": {
    fontFamily: theme.fontFamily.body,
    color: "#414141",
    fontSize: "12px",
    letterSpacing: "0.02em",
    lineHeight: "16px",
    fontWeight: 400,
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
