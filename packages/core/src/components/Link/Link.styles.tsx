import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { CSSProperties } from "react";
import { outlineStyles } from "utils";

export const StyledA = styled("a")({
  ...(theme.typography.label as CSSProperties),
  textDecoration: "underline",
  color: theme.colors.acce2,
  "&:focus-visible": { ...outlineStyles },
});