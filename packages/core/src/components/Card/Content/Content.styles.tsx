import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import CardContent from "@mui/material/CardContent";

export const StyledContent = styled(CardContent)({
  padding: `0 ${theme.spacing(2)} 15px ${theme.spacing(2)}`,
  "&:last-child": {
    paddingBottom: theme.spacing(2),
  },
});
