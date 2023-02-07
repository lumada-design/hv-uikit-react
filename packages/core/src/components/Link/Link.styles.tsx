import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBox } from "components";
import { outlineStyles } from "utils";

export const StyledBox = styled(HvBox)({
  ...theme.typography.label,
  textDecoration: "underline",
  color: theme.colors.acce2,
  "&:focus-visible": { ...outlineStyles },
});

export const StyledA = styled("a")({
  ...theme.typography.label,
  textDecoration: "underline",
  color: theme.colors.acce2,
  "&:focus-visible": { ...outlineStyles },
});
