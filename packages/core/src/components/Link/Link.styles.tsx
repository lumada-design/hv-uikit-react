import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

import { Box } from "components";
import { outlineStyles } from "utils";

export const StyledBox = styled(Box)({
  // ...theme.hv.typography.link,
  color: theme.colors.acce2,
  "&.focus-visible": { ...outlineStyles },
});

export const StyledA = styled("a")({
  // ...theme.hv.typography.link,
  color: theme.colors.acce2,
  "&.focus-visible": { ...outlineStyles },
});
