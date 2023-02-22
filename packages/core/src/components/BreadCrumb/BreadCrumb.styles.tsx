import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "index";

export const StyledRoot = styled("nav")({
  display: "flex",
  alignItems: "center",
  zIndex: 0,
});

export const StyledOrderedList = styled("ol")({
  display: "flex",
  paddingLeft: 0,
  marginLeft: `-${theme.space.xs}`,
});

export const StyledTypography = styled((props) => <HvTypography {...props} />)({
  padding: `8px ${theme.space.xs}`,
});
