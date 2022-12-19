import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import { theme } from "@hitachivantara/uikit-styles";

import { Typography } from "components";
import { useWidth } from "hooks";
import { Grid, GridProps } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
};
export default meta;

export const Main: StoryObj<GridProps> = {
  render: () => {
    const StyledItem = styled("div")({
      padding: theme.spacing(2),
      height: 150,
      textAlign: "center",
      backgroundColor: theme.colors.sema7,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 400,
      color: theme.colors.base2,
      display: "flex",
      alignItems: "center",
    });

    const width = useWidth();
    return (
      <>
        <Typography variant="label">{`Current width: ${width}`}</Typography>
        <br />
        <Grid container>
          <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
            <StyledItem>xl=2 lg=3 md=4 sm=6 xs=1</StyledItem>
          </Grid>
          <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
            <StyledItem>xl=2 lg=3 md=4 sm=6 xs=1</StyledItem>
          </Grid>
          <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
            <StyledItem>xl=2 lg=3 md=4 sm=6 xs=1</StyledItem>
          </Grid>
          <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
            <StyledItem>xl=2 lg=3 md=4 sm=6 xs=1</StyledItem>
          </Grid>
          <Grid item xl={1} lg={2} md={3} xs={12}>
            <StyledItem>xl:6 lg:4 md:3 sm:2 xs:1</StyledItem>
          </Grid>
          <Grid item xl={1} lg={2} md={3} xs={12}>
            <StyledItem>xl:6 lg:4 md:3 sm:2 xs:1</StyledItem>
          </Grid>
          <Grid item xl={1} lg={2} md={3} xs={12}>
            <StyledItem>xl:6 lg:4 md:3 sm:2 xs:1</StyledItem>
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
            <StyledItem>xl:6 lg:6 md:3 sm:2 xs:1</StyledItem>
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
            <StyledItem>xl:6 lg:4 md:3 sm:2 xs:1</StyledItem>
          </Grid>
        </Grid>
      </>
    );
  },
};

export const The12Columns: StoryObj<GridProps> = {
  render: () => {
    const width = useWidth();

    const StyledContainer = styled(Grid)({
      border: "1px solid",
      borderColor: theme.colors.atmo4,
      backgroundColor: theme.colors.atmo2,
      marginTop: theme.spacing(1),
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
      backgroundColor: theme.colors.sema7,
      display: "flex",
      height: "150px",
      width: "100%",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 0,
      "&>*": {
        margin: "auto",
        color: theme.colors.base2,
      },
    });

    return (
      <>
        <Typography variant="label">{`Current width: ${width}`}</Typography>
        <StyledContainer container>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
            <Grid key={value} item xs={1} sm={1} md={1} lg={1} xl={1}>
              <StyledBox>{value.toString()}</StyledBox>
            </Grid>
          ))}
        </StyledContainer>
      </>
    );
  },
};
