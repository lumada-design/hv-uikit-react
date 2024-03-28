import styled from "@emotion/styled";
import { Popper } from "@mui/base";
import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

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
  },
);
