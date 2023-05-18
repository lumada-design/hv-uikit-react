import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";
import { Popper } from "@mui/base";

const StyledPopupContainer = styled("div")({
  marginLeft: theme.spacing("xs"),
});

const StyledPopper = styled(Popper)({
  zIndex: theme.zIndices.popover,
});

export { StyledPopupContainer, StyledPopper };
