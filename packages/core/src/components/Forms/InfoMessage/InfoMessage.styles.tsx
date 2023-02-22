import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";

export const StyledTypography = styled(HvTypography)(
  ({
    $infoDisabled,
    $gutter,
  }: {
    $infoDisabled: boolean;
    $gutter: boolean;
  }) => ({
    display: "inline-block",
    ...($infoDisabled && {
      color: theme.colors.atmo5,
    }),
    ...($gutter && {
      padding: `0 0 6px ${theme.space.xs}`,
    }),
  })
);
