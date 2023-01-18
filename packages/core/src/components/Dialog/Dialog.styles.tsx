import styled from "@emotion/styled";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import fade from "utils/hexToRgbA";
import { HvButton } from "components";

export const StyledDialog = styled(Dialog)({});

export const StyledPaper = styled(
  Paper,
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
  "&:not(.fullscreen)": {
    maxHeight: `calc(100% - (2 * ${theme.dialog.margin}))`,
    display: "flex",
    flexDirection: "column",
  },
  "& svg *.color0": {
    fill: theme.colors.acce1,
  },
}));

export const StyledBackdrop = styled(
  Backdrop,
  transientOptions
)(({ $backColor }: { $backColor: string }) => ({
  background: fade($backColor, 0.8),
}));

export const StyledClose = styled(HvButton)({
  padding: 0,
  minWidth: "inherit",
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
});
