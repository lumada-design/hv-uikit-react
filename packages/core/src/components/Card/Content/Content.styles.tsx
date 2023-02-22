import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import CardContent from "@mui/material/CardContent";

export const StyledContent = styled(CardContent)({
  padding: `0 ${theme.space.sm} 15px ${theme.space.sm}`,
  "&:last-child": {
    paddingBottom: theme.space.sm,
  },
});
