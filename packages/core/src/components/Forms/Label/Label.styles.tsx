import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { transientOptions } from "utils/transientOptions";

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
    display: "inline-block",
    ...($labelDisabled && {
      color: theme.colors.secondary_60,
    }),
    ...($childGutter && {
      paddingBottom: "6px",
    }),
  })
);
