import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";

export const StyledTypography = styled(HvTypography)(
  ({
    $labelDisabled,
    $childGutter,
  }: {
    $labelDisabled: boolean;
    $childGutter: boolean;
  }) => ({
    display: "inline-block",
    ...($labelDisabled && {
      color: theme.colors.atmo5,
    }),
    ...($childGutter && {
      paddingBottom: "6px",
    }),
  })
);
