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

export const The12Columns: StoryObj<HvGridProps> = {
  render: () => {
    const width = useWidth();

    const StyledContainer = styled(HvGrid)({
      border: "1px solid",
      borderColor: theme.colors.atmo4,
      backgroundColor: theme.colors.atmo2,
      marginTop: theme.space.xs,
      marginLeft: 0,
      marginRight: 32,
      width: "100%",
      "& div": {
        paddingTop: "0px!important",
        paddingLeft: "8px!important",
        paddingBottom: 0,
        paddingRight: 8,
      },
    });

    const StyledBox = styled("div")({
      backgroundColor: theme.colors.neutral_20,
      display: "flex",
      height: "150px",
      width: "100%",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 0,
      "&>*": {
        margin: "auto",
        color: theme.colors.base_dark,
      },
    });

    return (
      <>
        <HvTypography variant="label">{`Current width: ${width}`}</HvTypography>
        <StyledContainer container>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
            <HvGrid key={value} item xs={1} sm={1} md={1} lg={1} xl={1}>
              <StyledBox>{value.toString()}</StyledBox>
            </HvGrid>
          ))}
        </StyledContainer>
      </>
    );
  },
};
