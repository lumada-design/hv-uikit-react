import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { transientOptions } from "utils/transientOptions";

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(({ $indentContent }: { $indentContent: boolean }) => ({
  padding: `0 ${theme.space.sm} ${theme.space.sm} ${theme.space.sm}`,
  flex: "none",
  ...($indentContent && {
    marginLeft: "42px",
    paddingRight: "62px",
    flex: 1,
    overflowY: "auto",
  }),
}));
