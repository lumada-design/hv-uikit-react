import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { HvTypography } from "@core/components/Typography";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledRoot = styled(
  "div",
  transientOptions
)(
  ({
    $counterDisabled,
    $gutter,
  }: {
    $counterDisabled: boolean;
    $gutter: boolean;
  }) => ({
    display: "inline-block",
    float: "right",
    ...($counterDisabled && {
      color: theme.colors.secondary_60,
    }),
    ...($gutter && {
      paddingLeft: `6px`,
    }),
  })
);

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(
  ({
    $overloaded,
    $counterDisabled,
  }: {
    $overloaded: boolean;
    $counterDisabled: boolean;
  }) => ({
    ...($overloaded && {
      color: theme.colors.negative,
    }),
    ...($counterDisabled && {
      color: theme.colors.secondary_60,
    }),
  })
);
