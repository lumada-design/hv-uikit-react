import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { CSSProperties } from "react";

import { outlineStyles } from "@core/utils/focusUtils";

export const StyledA = styled("a")({
  ...(theme.typography.label as CSSProperties),
  textDecoration: "underline",
  color: theme.colors.primary,
  "&:focus-visible": { ...outlineStyles },
});
