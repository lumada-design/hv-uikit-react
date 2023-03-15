import { theme, HvTypography } from "@hitachivantara/uikit-react-core";

export const CssVariables = () => {
  return (
    <HvTypography
      style={{
        color: theme.colors.sema2,
        fontWeight: theme.fontWeights.semibold,
        fontSize: theme.fontSizes.lg,
      }}
    >
      CSS variables!
    </HvTypography>
  );
};
