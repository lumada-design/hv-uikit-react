import styled from "@emotion/styled";
import { HvTypography } from "components";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";

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
      color: theme.colors.atmo5,
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
      color: theme.colors.sema4,
    }),
    ...($counterDisabled && {
      color: theme.colors.atmo5,
    }),
  })
);
