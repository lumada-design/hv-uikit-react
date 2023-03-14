import styled from "@emotion/styled";
import { HvButton, theme } from "@hitachivantara/uikit-react-core";

export const Spacing = () => {
  const StyledContainer = styled("div")({
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(["xs", "6px"]),
    },
  });

  return (
    <StyledContainer>
      <HvButton variant="primary">Button 1</HvButton>
      <HvButton variant="primarySubtle">Button 2</HvButton>
      <HvButton variant="primaryGhost">Button 3</HvButton>
    </StyledContainer>
  );
};
