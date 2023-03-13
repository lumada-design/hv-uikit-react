import { theme, HvTypography } from "@hitachivantara/uikit-react-core";
import styled from "@emotion/styled";

export const CssVariables = () => {
  const StyledHvTypography = styled(HvTypography)({
    color: theme.colors.sema2,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.lg,
  });

  return <StyledHvTypography>CSS variables!</StyledHvTypography>;
};
