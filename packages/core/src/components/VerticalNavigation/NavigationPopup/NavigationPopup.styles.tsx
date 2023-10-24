import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";
import { Popper } from "@mui/base";

import { createClasses } from "@core/utils/classes";

const StyledPopper = styled(Popper)({
  zIndex: theme.zIndices.popover,
});

export { StyledPopper };

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationPopup",
  {
    popup: {},
    container: {
      marginLeft: theme.spacing("xs"),
    },
    popper: {
      zIndex: theme.zIndices.popover,
    },
  }
);
