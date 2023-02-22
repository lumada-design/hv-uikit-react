import styled from "@emotion/styled";
import { PopperUnstyled } from "@mui/base";
import { theme } from "@hitachivantara/uikit-styles";
import { HvSelectionList } from "components";

export const StyledRoot = styled("div")({
  position: "relative",
});

export const StyledSelectionList = styled(HvSelectionList)({
  backgroundColor: theme.colors.atmo1,
  boxShadow: theme.shadows.md,
  padding: theme.space.xs,
  width: "100%",
});

export const StyledPopper = styled(PopperUnstyled)({
  width: "100%",
  position: "absolute",
  transform: "translate3d(0, -1px, 0) !important",
  zIndex: theme.zIndices.tooltip,
});
