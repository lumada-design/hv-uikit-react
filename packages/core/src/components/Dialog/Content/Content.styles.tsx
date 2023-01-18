import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import DialogContent from "@mui/material/DialogContent";
import { HvTypography } from "components";
import { transientOptions } from "utils/transientOptions";

export const StyledContent = styled(DialogContent)({});

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(({ $indentContent }: { $indentContent: boolean }) => ({
  padding: `0 ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
  flex: "none",
  ...($indentContent && {
    marginLeft: "42px",
    paddingRight: "62px",
    flex: 1,
    overflowY: "auto",
  }),
}));
