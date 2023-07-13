import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { HvTypography } from "@core/components/Typography";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(
  ({
    $infoDisabled,
    $gutter,
  }: {
    $infoDisabled: boolean;
    $gutter: boolean;
  }) => ({
    color: theme.forms.infoMessage.textColor,
    display: "inline-block",
    ...($infoDisabled && {
      color: theme.colors.secondary_60,
    }),
    ...($gutter && {
      padding: `0 0 6px ${theme.space.xs}`,
    }),
  })
);
