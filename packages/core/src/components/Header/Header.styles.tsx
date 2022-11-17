import styled from "@emotion/styled";
import { theme, themeVariant } from "@hitachivantara/uikit-styles";

export const StyledAppBar = styled("div")<{ position: string }>(
  {
    height: theme.header.height,
    backgroundColor: theme.colors.atmo1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: theme.zIndices.banner,
    color: theme.colors.atmo1,
    boxShadow: theme.header.shadow,
    borderTop: `${theme.header.borderTopThickness} solid ${theme.header.borderTopColor}`,
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
  padding: `0 ${theme.spacing(2)}`,
  boxShadow: theme.header.shadow,
  "& > *:not(nav)": {
    zIndex: 2,
  },
});
