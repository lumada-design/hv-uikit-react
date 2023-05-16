import styled from "@emotion/styled";
import {
  paperClasses as MuiPaperClasses,
  Backdrop as MuiBackdrop,
} from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "@core/utils/transientOptions";
import fade from "@core/utils/hexToRgbA";
import { HvButton, HvButtonProps } from "@core/components";
import { forwardRef, Ref } from "react";
import { CSSInterpolation } from "@emotion/serialize";
import { HvDialogClasses } from "./dialogClasses";

export const styles: Partial<Record<keyof HvDialogClasses, CSSInterpolation>> =
  {
    paper: {
      [`&.MuiDialog-paper`]: {
        maxHeight: `calc(100% - (2 * ${theme.dialog.margin}))`,
        display: "flex",
        flexDirection: "column",
        color: theme.colors.secondary,
        flex: "0 0 83.3333333%",
        backgroundColor: theme.colors.atmo1,
        padding: "0px",
        overflow: "auto",
        boxShadow: ["none", "0 2px 12px rgba(65,65,65,0.12)"],
        borderRadius: theme.dialog.borderRadius,
        [`&.${MuiPaperClasses.root}`]: {
          // width: "inherit",
          minWidth: "33.3333333%",
          maxWidth: "83.3333333%",
          "&.fullscreen": {
            flex: "1",
            borderRadius: "0",
            width: "inherit",
            minWidth: "100%",
            maxWidth: "100%",
            minHeight: "100%",
            maxHeight: "100%",
          },
        },
      },
    },
  };

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
