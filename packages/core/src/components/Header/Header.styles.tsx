import styled from "@emotion/styled";
import { AppBar } from "@mui/material";
import { themeUtils, themeVariant, themeVars } from "theme";

export const StyledAppBar = styled(AppBar)({
  height: themeVars.header.height,
  backgroundColor: themeVars.colors.atmo1,
  "&.MuiAppBar-root": {
    borderTop: themeVars.header.borderTop,
    backgroundColor: "transparent",
  },
});

export const DivStyledAppBar = styled("div")<{ position: string }>(
  {
    height: themeVars.header.height,
    backgroundColor: themeVars.colors.atmo1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: themeVars.zIndices.banner,
    color: themeVars.colors.atmo1,
    boxShadow: themeVars.header.shadow,
    borderTop: themeVars.header.borderTop,
  },
  themeVariant({
    prop: "position",
    variants: {
      fixed: {
        position: "fixed",
        top: 0,
        left: "auto",
        right: 0,
      },
      relative: {
        position: "relative",
      },
    },
  })
);

export const HeaderRoot = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: themeUtils.space(1),
  boxShadow: themeVars.header.shadow,
  "& > *:not(nav)": {
    zIndex: 2,
  },
});
