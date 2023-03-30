import { theme, HvTypography } from "@hitachivantara/uikit-react-core";

export const CssVariables = () => {
  return (
    <HvTypography
      style={{
        color: theme.colors.neutral,
        fontWeight: theme.fontWeights.semibold,
        fontSize: theme.fontSizes.lg,
      }}
    >
      CSS variables!
    </HvTypography>
  );
};
