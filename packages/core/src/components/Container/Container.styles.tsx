import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Container as MuiContainer } from "@mui/material";

export const StyledRoot = styled(MuiContainer)(
  ({ breakpoints }: { breakpoints: any }) => ({
    paddingLeft: theme.space.sm,
    paddingRight: theme.space.sm,
    [breakpoints.up("md")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  })
);
