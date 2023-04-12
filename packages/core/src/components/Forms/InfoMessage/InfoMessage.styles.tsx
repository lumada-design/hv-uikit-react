import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "~/components";
import { transientOptions } from "~/utils/transientOptions";

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
    display: "inline-block",
    ...($infoDisabled && {
      color: theme.colors.secondary_60,
    }),
    ...($gutter && {
      padding: `0 0 6px ${theme.space.xs}`,
    }),
  })
);
