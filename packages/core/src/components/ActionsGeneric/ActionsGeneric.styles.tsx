import styled from "@emotion/styled";
import { HvButton, HvButtonProps } from "components";
import { transientOptions } from "utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";
import fade from "utils/hexToRgbA";

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
  (props: HvButtonProps) => <HvButton {...props} />,
  transientOptions
)(({ $baseColor }: { $baseColor: string }) => ({
  "&:not(:last-child)": {
    marginRight: theme.space.xs,
  },
  "&:hover": {
    backgroundColor: fade($baseColor, 0.3),
  },
}));
