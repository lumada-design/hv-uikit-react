import React from "react";
import styled from "@emotion/styled";
// @ts-ignore
import { HvButton, theme } from "@hitachivantara/uikit-core";

export const SpacingUsage = () => {
  const StyledContainer = styled("div")({
    marginTop: theme.spacing(2),

    "& > *:not(:last-child)": {
      marginRight: theme.spacing(3),
    },
  });

  return (
    <StyledContainer>
      <HvButton variant="primary">Test 1</HvButton>
      <HvButton variant="primarySubtle">Test 2</HvButton>
      <HvButton variant="primaryGhost">Test 3</HvButton>
    </StyledContainer>
  );
};
