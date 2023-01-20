import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBox } from "components";
import { outlineStyles } from "utils";

export const StyledBox = styled(HvBox)({
  fontSize: "12px",
  letterSpacing: "0.02em",
  lineHeight: "16px",
  fontWeight: 600,
  textDecoration: "underline",
  color: theme.colors.acce2,
  "&:focus-visible": { ...outlineStyles },
});

export const StyledA = styled("a")({
  fontSize: "12px",
  letterSpacing: "0.02em",
  lineHeight: "16px",
  fontWeight: 600,
  textDecoration: "underline",
  color: theme.colors.acce2,
  "&:focus-visible": { ...outlineStyles },
});
