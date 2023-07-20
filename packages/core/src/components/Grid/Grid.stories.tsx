import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography, HvGrid, HvGridProps } from "@core/components";
import { useWidth } from "@core/hooks";

const meta: Meta<typeof HvGrid> = {
  title: "Components/Grid/Grid",
  component: HvGrid,
  parameters: {
    eyes: { include: false },
  },
};
export default meta;

export const Main: StoryObj<HvGridProps> = {
  render: () => {
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

    const width = useWidth();
    return (
      <>
        <HvTypography variant="label">{`Current width: ${width}`}</HvTypography>
        <br />
        <HvGrid container>
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
            <StyledItem>xl:6 lg:4 md:3 sm:2 xs:1</StyledItem>
          </HvGrid>
          <HvGrid item xl={1} lg={2} md={3} xs={12}>
            <StyledItem>xl:6 lg:4 md:3 sm:2 xs:1</StyledItem>
          </HvGrid>
          <HvGrid item xl={1} lg={2} md={3} xs={12}>
            <StyledItem>xl:6 lg:4 md:3 sm:2 xs:1</StyledItem>
          </HvGrid>
          <HvGrid item xl={3} lg={3} md={6} sm={12} xs={12}>
            <StyledItem>xl:6 lg:6 md:3 sm:2 xs:1</StyledItem>
          </HvGrid>
          <HvGrid item xl={3} lg={3} md={6} sm={12} xs={12}>
            <StyledItem>xl:6 lg:4 md:3 sm:2 xs:1</StyledItem>
          </HvGrid>
        </HvGrid>
      </>
    );
  },
};

const BREAKPOINT_GUTTERS = {
  xs: "15px",
  sm: "15px",
  md: "30px",
  lg: "30px",
  xl: "30px",
};

export const The12Columns: StoryObj<HvGridProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Grid using the default 12 columns. You can resize the browser to see the gutters' size change.",
      },
    },
  },
  render: () => {
    const width = useWidth();

    const StyledBox = styled("div")({
      backgroundColor: theme.colors.neutral_20,
      display: "flex",
      height: "100px",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    });

    const columns = Array.from({ length: 24 }, (_, index) => index + 1);

    return (
      <>
        <HvTypography variant="label">{`Current width: ${width} (gutter size: ${BREAKPOINT_GUTTERS[width]})`}</HvTypography>
        <HvGrid container>
          {columns.map((value) => (
            <HvGrid key={value} item xs={1}>
              <StyledBox>{value.toString()}</StyledBox>
            </HvGrid>
          ))}
        </HvGrid>
      </>
    );
  },
};

const BREAKPOINT_COLUMNS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 12,
  xl: 12,
};

export const TheDesignSystemColumns: StoryObj<HvGridProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Grid using the Design System's column definitions. The number of columns is based on the current breakpoint. Resize the browser to see the number of columns change.",
      },
    },
  },
  render: () => {
    const width = useWidth();

    const StyledBox = styled("div")({
      backgroundColor: theme.colors.neutral_20,
      display: "flex",
      height: "100px",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    });

    const columns = Array.from({ length: 24 }, (_, index) => index + 1);

    return (
      <>
        <HvTypography variant="label">{`Current width: ${width} (${BREAKPOINT_COLUMNS[width]} columns)`}</HvTypography>
        <HvGrid container columns="auto">
          {columns.map((value) => (
            <HvGrid key={value} item xs={1}>
              <StyledBox>{value.toString()}</StyledBox>
            </HvGrid>
          ))}
        </HvGrid>
      </>
    );
  },
};
