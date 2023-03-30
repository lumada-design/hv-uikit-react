import styled from "@emotion/styled";
import {
  HvGrid,
  theme,
  HvTypography,
  useWidth,
} from "@hitachivantara/uikit-react-core";

const StyledItem = styled("div")({
  padding: theme.space.sm,
  height: 150,
  textAlign: "center",
  backgroundColor: theme.colors.neutral_20,
  fontSize: "12px",
  letterSpacing: "0.02em",
  lineHeight: "16px",
  fontWeight: 400,
  color: theme.colors.base_dark,
  display: "flex",
  alignItems: "center",
});

const getBreakpointValue = (breakpoint: string) => {
  const root = document.querySelector("#root");
  if (root) {
    const breakpointValue = getComputedStyle(root).getPropertyValue(
      "--breakpoints-values-" + breakpoint
    );
    return breakpointValue;
  }
  return 0;
};

export const Grid = () => {
  const width = useWidth();

  return (
    <>
      <HvTypography variant="label">
        {Object.keys(theme.breakpoints.values).map(
          (b: string) => `${b}: ${getBreakpointValue(b)}, `
        )}
      </HvTypography>
      <HvTypography variant="label">{`Current width: ${width}`}</HvTypography>
      <HvGrid container spacing={6}>
        <HvGrid item xl={2} lg={3} md={4} sm={6} xs={12}>
          <StyledItem>xl=2 lg=3 md=4 sm=6 xs=1</StyledItem>
        </HvGrid>
        <HvGrid item xl={2} lg={3} md={4} sm={6} xs={12}>
          <StyledItem>xl=2 lg=3 md=4 sm=6 xs=1</StyledItem>
        </HvGrid>
        <HvGrid item xl={2} lg={3} md={4} sm={6} xs={12}>
          <StyledItem>xl=2 lg=3 md=4 sm=6 xs=1</StyledItem>
        </HvGrid>
        <HvGrid item xl={2} lg={3} md={4} sm={6} xs={12}>
          <StyledItem>xl=2 lg=3 md=4 sm=6 xs=1</StyledItem>
        </HvGrid>
        <HvGrid item xl={1} lg={2} md={3} xs={12}>
          <StyledItem>xl:1 lg:2 md:3 sm:false xs:12</StyledItem>
        </HvGrid>
        <HvGrid item xl={1} lg={2} md={3} xs={12}>
          <StyledItem>xl:1 lg:2 md:3 sm:false xs:12</StyledItem>
        </HvGrid>
        <HvGrid item xl={1} lg={2} md={3} xs={12}>
          <StyledItem>xl:1 lg:2 md:3 sm:false xs:12</StyledItem>
        </HvGrid>
        <HvGrid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <StyledItem>xl:3 lg:3 md:6 sm:12 xs:12</StyledItem>
        </HvGrid>
        <HvGrid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <StyledItem>xl:3 lg:3 md:6 sm:12 xs:12</StyledItem>
        </HvGrid>
      </HvGrid>
    </>
  );
};
