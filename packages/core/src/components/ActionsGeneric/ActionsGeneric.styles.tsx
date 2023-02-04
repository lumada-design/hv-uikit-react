import styled from "@emotion/styled";
import { HvButton } from "index";
import { transientOptions } from "utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledRoot = styled(
  "div",
  transientOptions
)(({ $actionOverflow }: { $actionOverflow: boolean }) => ({
  ...($actionOverflow && {
    display: "flex",
    float: "right",
  }),
}));

export const StyledButton = styled((props) => <HvButton {...props} />)({
  "&:not(:last-child)": {
    marginRight: theme.spacing(1),
  },
});
