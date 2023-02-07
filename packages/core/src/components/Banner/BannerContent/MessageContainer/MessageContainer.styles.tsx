import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvActionsGeneric,
  HvTypography,
  actionsGenericClasses,
} from "components";
import fade from "utils/hexToRgbA";

export const StyledIconContainer = styled("div")({
  marginRight: theme.spacing(1),
  marginLeft: -theme.spacing(1),
});

export const StyledTypography = styled((props) => <HvTypography {...props} />)({
  color: theme.colors.base2,
  wordBreak: "break-word",
  maxWidth: "700px",
  overflow: "hidden",
  marginRight: 10,
});

export const StyledMessageContainer = styled("div")({
  flex: "0 0 auto",
});

export const StyledActionsGeneric = styled((props) => (
  <HvActionsGeneric {...props} />
))(({ $baseColor }: { $baseColor: string }) => ({
  [`& .${actionsGenericClasses.button}`]: {
    ":hover": {
      backgroundColor: fade($baseColor, 0.3),
    },
  },
}));
