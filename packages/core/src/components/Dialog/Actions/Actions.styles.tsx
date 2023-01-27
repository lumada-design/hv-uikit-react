import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import DialogActions from "@mui/material/DialogActions";
import { transientOptions } from "utils/transientOptions";

export const StyledActions = styled(
  DialogActions,
  transientOptions
)(({ $fullscreen }: { $fullscreen: boolean }) => ({
  margin: "0",
  padding: theme.spacing(2),
  borderTop: `3px solid ${theme.colors.atmo2}`,
  height: 65,
  maxHeight: 65,
  flex: 1,
  ...($fullscreen && {
    position: "fixed",
    width: "100%",
    bottom: 0,
    left: 0,
  }),
  "&.MuiDialogActions-spacing": {
    "& > :not(:first-of-type)": {
      marginLeft: theme.spacing(1),
    },
  },
}));
