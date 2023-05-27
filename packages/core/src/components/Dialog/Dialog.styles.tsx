import styled from "@emotion/styled";
import { Backdrop as MuiBackdrop } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "@core/utils/transientOptions";
import fade from "@core/utils/hexToRgbA";
import { HvButton, HvButtonProps } from "@core/components";
import { forwardRef } from "react";
import { CSSInterpolation } from "@emotion/serialize";
import { PolymorphicRef } from "@core/types";
import { HvDialogClasses } from "./dialogClasses";

export const styles = {
  paper: {
    color: theme.colors.secondary,
    backgroundColor: theme.colors.atmo1,
    boxShadow: ["none", theme.colors.shadow],
    borderRadius: theme.dialog.borderRadius,
  },
} satisfies Partial<Record<keyof HvDialogClasses, CSSInterpolation>>;

export const StyledBackdrop = styled(
  MuiBackdrop,
  transientOptions
)(({ $backColor }: { $backColor: string }) => ({
  background: fade($backColor, 0.8),
}));

export const StyledClose = styled(
  forwardRef((props: HvButtonProps, ref?: PolymorphicRef<"button">) => {
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
