import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "@core/components";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(
  ({
    $labelDisabled,
    $childGutter,
  }: {
    $labelDisabled: boolean;
    $childGutter: boolean;
  }) => ({
    fontWeight: theme.forms.label.fontWeight,
    display: "inline-block",
    ...($labelDisabled && {
      color: theme.colors.secondary_60,
    }),
    ...($childGutter && {
      paddingBottom: "6px",
    }),
  })
);
