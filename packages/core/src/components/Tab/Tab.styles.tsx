import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Tab as MuiTab } from "@mui/material";
import { outlineStyles } from "utils";

export const StyledTab = styled(MuiTab)({
  // Root
  marginTop: "3px",
  padding: theme.tab.padding,
  minWidth: 70,
  minHeight: 32,
  textTransform: "none",
  fontFamily: theme.fontFamily.body,
  color: theme.colors.acce1,
  fontSize: theme.tab.fontSize,
  letterSpacing: theme.tab.letterSpacing,
  lineHeight: theme.tab.lineHeight,
  fontWeight: 400,
  opacity: 1,
  "&::after": {
    position: "absolute",
    left: 0,
    top: "calc(100% - 1px)",
    height: "1px",
    width: "100%",
    backgroundColor: theme.colors.atmo4,
    content: "''",
  },
  "&:hover": {
    backgroundColor: theme.tab.hoverBackgroundColor,
    borderRadius: theme.tab.hoverBackgroundBorderRadius,
    "&::after": {
      height: "1px",
      backgroundColor: theme.tab.hoverUnderlineBackgroundColor,
    },
  },
  "&:focus-visible": {
    ...outlineStyles,
  },
  "&:focus": {
    outline: "none",
  },

  // Override Mui styling: https://mui.com/material-ui/api/tab/#css
  "&.Mui-selected": {
    color: theme.colors.acce1,
    letterSpacing: theme.tab.letterSpacing,
    lineHeight: theme.tab.lineHeight,
    fontWeight: 600,
  },
  "&.Mui-disabled": {
    color: theme.colors.atmo5,
    cursor: "not-allowed",
    pointerEvents: "all",
    opacity: 1,
    "&:hover": {
      background: "none",
    },
  },
  "& .MuiTab-iconWrapper": {
    margin: 0,
  },
});
