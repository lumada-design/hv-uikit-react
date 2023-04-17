import styled from "@emotion/styled";
import {
  Paper as MuiPaper,
  paperClasses as MuiPaperClasses,
  Backdrop as MuiBackdrop,
} from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "~/utils/transientOptions";
import fade from "~/utils/hexToRgbA";
import { HvButton, HvButtonProps } from "~/components";
import { forwardRef, Ref } from "react";

export const StyledPaper = styled(
  MuiPaper,
  transientOptions
)(({ $fullscreen }: { $fullscreen: boolean }) => ({
  color: theme.colors.secondary,
  flex: $fullscreen ? "1" : "0 0 83.3333333%",
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
    fill: theme.colors.secondary,
  },
  [`&.${MuiPaperClasses.root}`]: {
    width: "inherit",
    minWidth: $fullscreen ? "100%" : "33.3333333%",
    maxWidth: $fullscreen ? "100%" : "83.3333333%",
  },
}));

export const StyledBackdrop = styled(
  MuiBackdrop,
  transientOptions
)(({ $backColor }: { $backColor: string }) => ({
  background: fade($backColor, 0.8),
}));

export const StyledClose = styled(
  forwardRef((props: HvButtonProps, ref?: Ref<HTMLButtonElement>) => {
    return <HvButton {...props} ref={ref} />;
  })
)({
  padding: 0,
  minWidth: "auto",
  position: "absolute",
  top: theme.space.sm,
  right: theme.space.sm,
  width: 32,
  height: 32,
});
