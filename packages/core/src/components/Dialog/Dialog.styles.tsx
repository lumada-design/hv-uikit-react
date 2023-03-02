import styled from "@emotion/styled";
import { Paper as MuiPaper, Backdrop as MuiBackdrop } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import fade from "utils/hexToRgbA";
import { HvButton } from "components";

export const StyledPaper = styled(
  MuiPaper,
  transientOptions
)(({ $fullscreen }: { $fullscreen: boolean }) => ({
  color: theme.colors.acce1,
  flex: $fullscreen ? "1" : "0 0 66.66667%",
  maxWidth: $fullscreen ? "100%" : "66.66667%",
  backgroundColor: theme.colors.atmo1,
  padding: "0px",
  overflow: "auto",
  boxShadow: ["none", "0 2px 12px rgba(65,65,65,0.12)"],
  borderRadius: theme.dialog.borderRadius,
  ...(!$fullscreen && {
    maxHeight: `calc(100% - (2 * ${theme.dialog.margin}))`,
    display: "flex",
    flexDirection: "column",
  }),
  "& svg *.color0": {
    fill: theme.colors.acce1,
  },
}));

export const StyledBackdrop = styled(
  MuiBackdrop,
  transientOptions
)(({ $backColor }: { $backColor: string }) => ({
  background: fade($backColor, 0.8),
}));

export const StyledClose = styled(HvButton)({
  padding: 0,
  minWidth: "inherit",
  position: "absolute",
  top: theme.space.sm,
  right: theme.space.sm,
});
