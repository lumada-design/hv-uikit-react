import styled from "@emotion/styled";
import { Backdrop as MuiBackdrop } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "@core/utils/transientOptions";
import fade from "@core/utils/hexToRgbA";
import { createClasses } from "@core/utils";

export const { staticClasses, useClasses } = createClasses("HvDialog", {
  root: {},
  background: {},
  paper: {
    color: theme.colors.secondary,
    backgroundColor: theme.colors.atmo1,
    boxShadow: ["none", theme.colors.shadow],
    borderRadius: theme.dialog.borderRadius,
  },
  fullscreen: {},
  closeButton: {
    padding: 0,
    minWidth: "auto",
    position: "absolute",
    top: theme.space.sm,
    right: theme.space.sm,
    width: 32,
    height: 32,
  },
});

export const StyledBackdrop = styled(
  MuiBackdrop,
  transientOptions
)(({ $backColor }: { $backColor: string }) => ({
  background: fade($backColor, 0.8),
}));
