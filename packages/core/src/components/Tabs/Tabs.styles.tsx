import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Tabs as MuiTabs } from "@mui/material";

export const StyledTabs = styled(MuiTabs)({
  // Root
  minHeight: 0,
  overflow: "visible",

  // Override Mui styling: https://mui.com/material-ui/api/tabs/#css
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: theme.colors.acce1,
    },
    height: 2,
  },
  "& .MuiTabs-scroller": {
    overflow: "visible !important",
  },
  "& .MuiTabs-flexContainer": {
    "& button:first-of-type": {
      marginLeft: "3px",
    },
  },
});
