import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import {
  Container as MuiContainer,
  Breakpoints as MuiBreakpoints,
} from "@mui/material";
import { transientOptions } from "~/utils/transientOptions";

export const StyledRoot = styled(
  MuiContainer,
  transientOptions
)(({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
  paddingLeft: theme.space.sm,
  paddingRight: theme.space.sm,
  [$breakpoints.up("md")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));
