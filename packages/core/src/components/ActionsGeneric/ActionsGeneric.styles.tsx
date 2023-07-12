import styled from "@emotion/styled";
import { HvButton, HvButtonProps } from "@core/components";
import { transientOptions } from "@core/utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";
import fade from "@core/utils/hexToRgbA";
import { forwardRef } from "react";
import { PolymorphicRef } from "@core/types";

export const StyledRoot = styled(
  "div",
  transientOptions
)(({ $actionOverflow }: { $actionOverflow: boolean }) => ({
  ...($actionOverflow && {
    display: "flex",
    alignItems: "center",
    float: "right",
  }),
}));

export const StyledButton = styled(
  forwardRef((props: HvButtonProps, ref?: PolymorphicRef<"button">) => {
    return <HvButton {...props} ref={ref} />;
  }),
  transientOptions
)(({ $baseColor }: { $baseColor: string }) => ({
  "&:not(:last-child)": {
    marginRight: theme.space.xs,
  },
  "&:hover": {
    backgroundColor: fade($baseColor, 0.3),
  },
}));
