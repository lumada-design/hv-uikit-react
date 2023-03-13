import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledNavigationContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(["xs", 0]),
});

export const StyledNavigationMonth = styled("div")({
  minWidth: "160px",
});
