import styled from "@emotion/styled";
import { Popper } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { HvSelectionList } from "components";

export const StyledRoot = styled("div")({
  position: "relative",
  // "& $list": {
  //   backgroundColor: theme.colors.atmo1,
  //   boxShadow: theme.shadows.md,
  //   padding: theme.spacing(1),
  //   width: "100%",
  // },
});

export const StyledSelectionList = styled(HvSelectionList)({
  backgroundColor: theme.colors.atmo1,
  boxShadow: theme.shadows.md,
  padding: theme.spacing(1),
  width: "100%",
});

export const StyledPopper = styled(Popper)({
  width: "100%",
  position: "absolute",
  transform: "translate3d(0, -1px, 0) !important",
  zIndex: theme.zIndices.tooltip,
});
