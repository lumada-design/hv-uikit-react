import styled from "@emotion/styled";
import { HvButton } from "index";
import { transientOptions } from "utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";
import fade from "utils/hexToRgbA";

export const StyledRoot = styled(
  "div",
  transientOptions
)(({ $actionOverflow }: { $actionOverflow: boolean }) => ({
  ...($actionOverflow && {
    display: "flex",
    float: "right",
  }),
}));

export const StyledButton = styled((props) => <HvButton {...props} />)(
  ({ $baseColor }: { $baseColor: string }) => ({
    "&:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
    "&:hover": {
      backgroundColor: fade($baseColor, 0.3),
    },
  })
);
