import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";

export const StyledRoot = styled("div")({
  width: "100%",
  height: "100%",
});

export const StyledIndicatorsContainer = styled("div")({
  display: "inline-flex",
  minHeight: "16px",
  alignItems: "flex-end",
});

export const StyledVisualIndicator = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "40px",
  backgroundColor: "transparent",
  marginRight: theme.spacing(1.25),
});

export const StyledIndicatorText = styled(HvTypography)({
  marginRight: theme.spacing(1.25),
});

export const StyledIndicatorUnit = styled(HvTypography)({
  alignSelf: "flex-end",
  paddingBottom: "3px",
});

export const StyledComparisonComposition = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
});

export const StyledTrendIndicator = styled("div")({
  marginRight: theme.spacing(1.25),
  float: "right",
});

export const StyledComparisonContainer = styled("div")({
  minHeight: "16px",
  display: "flex",
  alignItems: "flex-end",
});

export const StyledInternalVisualComparisonDiv = styled("div")({
  marginRight: theme.spacing(1.25),
});

export const StyledInternalVisualComparisonTypography = styled(HvTypography)({
  marginRight: theme.spacing(1.25),
});
