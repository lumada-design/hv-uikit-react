import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { buttonClasses } from "@core/components/Button";

export const StyledDiv = styled.div({
  backgroundColor: "transparent",
  display: "flex",
  gap: theme.space.xs,
  alignItems: "center",
  marginLeft: "auto",
  "& > *": {
    marginLeft: theme.space.xs,
  },
  [`& .${buttonClasses?.root}`]: {
    "&:hover": { backgroundColor: theme.header.hoverColor },
  },
});
