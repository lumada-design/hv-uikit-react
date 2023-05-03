import styled from "@emotion/styled";
import { Popper } from "@mui/base";
import { theme } from "@hitachivantara/uikit-styles";
import { HvSelectionList } from "@core/components";

export const StyledRoot = styled("div")({
  position: "relative",
});

export const StyledSelectionList = styled(HvSelectionList)({
  backgroundColor: theme.colors.atmo1,
  boxShadow: theme.colors.shadow,
  padding: theme.space.xs,
  width: "100%",
});

export const StyledPopper = styled(Popper)({
  width: "100%",
  position: "absolute",
  transform: "translate3d(0, -1px, 0) !important",
  zIndex: theme.zIndices.tooltip,
});
