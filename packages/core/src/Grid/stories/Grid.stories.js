/* eslint-disable react/prop-types */
import React from "react";
import { withStyles, useTheme } from "@mui/styles";
import { Hidden, Paper } from "@mui/material";
import { HvGrid, HvContainer, HvTypography, useWidth } from "../..";

export default {
  title: "Layout/Grid",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvGrid } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.4.0",
  },
  component: HvGrid,
};

export const Main = () => {
  const styles = (theme) => ({
    root: {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
      marginTop: theme.hvSpacing(2),
      flex: 1,
      fontFamily: theme.hv.typography.fontFamily,
      ...theme.hv.typography.normalText,
    },
    paper: {
      padding: theme.hvSpacing(2),
      height: 150,
      textAlign: "center",
      backgroundColor: theme.hv.palette.semantic.sema7,
      ...theme.hv.typography.normalText,
      color: theme.hv.palette.base.base2,
      display: "flex",
      alignItems: "center",
    },
  });
  const width = useWidth();
  const Example = withStyles(styles)(({ classes }) => (
    <div>
      <HvTypography variant="highlightText">{`Current width: ${width}`}</HvTypography>
      <div className={classes.root}>
        <HvContainer>
          <HvGrid container>
            <HvGrid item xl={1} lg={1} md sm={3} xs={3}>
              <Paper className={classes.paper}>xl=1 lg=1 md sm=3 xs=3</Paper>
            </HvGrid>
            <HvGrid item xl={1} lg={1} md sm={3} xs={3}>
              <Paper className={classes.paper}>xl=1 lg=1 md sm=3 xs=3</Paper>
            </HvGrid>
            <HvGrid item xl={1} lg={1} md sm={3} xs={3}>
              <Paper className={classes.paper}>xl=1 lg=1 md sm=3 xs=3</Paper>
            </HvGrid>
            <HvGrid item xl={1} lg={1} md sm={3} xs={3}>
              <Paper className={classes.paper}>xl=1 lg=1 md sm=3 xs=3</Paper>
            </HvGrid>
            <Hidden smDown>
              <HvGrid item xl={1} lg={1} md>
                <Paper className={classes.paper}>xl=1 lg=1 md sm=false xs=false</Paper>
              </HvGrid>
              <HvGrid item xl={1} lg={1} md>
                <Paper className={classes.paper}>xl=1 lg=1 md sm=false xs=false</Paper>
              </HvGrid>
              <HvGrid item xl={1} lg={1} md>
                <Paper className={classes.paper}>xl=1 lg=1 md sm=false xs=false</Paper>
              </HvGrid>
              <HvGrid item xl={1} lg={1} md>
                <Paper className={classes.paper}>xl=1 lg=1 md sm=false xs=false</Paper>
              </HvGrid>
              <Hidden mdDown>
                <HvGrid item xl={1} lg={1}>
                  <Paper className={classes.paper}>xl=1 lg=1 md sm=false xs=false</Paper>
                </HvGrid>
                <HvGrid item xl={1} lg={1}>
                  <Paper className={classes.paper}>xl=1 lg=1 md sm=false xs=false</Paper>
                </HvGrid>
                <HvGrid item xl={1} lg={1}>
                  <Paper className={classes.paper}>xl=1 lg=1 md sm=false xs=false</Paper>
                </HvGrid>
                <HvGrid item xl={1} lg={1}>
                  <Paper className={classes.paper}>xl=1 lg=1 md sm=false xs=false</Paper>
                </HvGrid>
              </Hidden>
            </Hidden>
          </HvGrid>
        </HvContainer>
      </div>
    </div>
  ));
  return <Example />;
};

const Box = ({ text, classes }) => (
  <div className={classes.box}>
    <HvTypography>{text}</HvTypography>
  </div>
);

const styles = (theme) => ({
  box: {
    backgroundColor: theme.hv.palette.semantic.sema7,
    display: "flex",
    height: "150px",
    width: "100%",
    padding: 20,
    "&>*": {
      margin: "auto",
      textAlign: "center",
      color: theme.hv.palette.base.base2,
    },
  },
});

const StyledBox = withStyles(styles)(Box);

export const The12Columns = () => {
  const theme = useTheme();

  const breakpoint = useWidth();
  const title = `Breakpoint: ${breakpoint}`;

  const styledContainer = {
    border: "1px solid",
    borderColor: theme.hv.palette.atmosphere.atmo4,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    marginTop: theme.hv.spacing.xs,
  };

  return (
    <div>
      <HvTypography variant="highlightText">{title}</HvTypography>
      <div style={styledContainer}>
        <HvGrid container>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
            <HvGrid key={value} item xs={1} sm={1} md={1} lg={1} xl={1}>
              <StyledBox text={value.toString()} />
            </HvGrid>
          ))}
        </HvGrid>
      </div>
    </div>
  );
};

export const Behaviour = () => {
  const theme = useTheme();

  const breakpoint = useWidth();
  const title = `Breakpoint: ${breakpoint}`;

  const styledContainer = {
    border: "1px solid",
    borderColor: theme.hv.palette.atmosphere.atmo4,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    marginTop: theme.hv.spacing.xs,
  };

  return (
    <div>
      <HvTypography variant="highlightText">{title}</HvTypography>
      <div style={styledContainer}>
        <HvGrid container>
          <HvGrid item xs={4} sm={8} md={8} lg={12} xl={12}>
            <StyledBox text="xs={4} sm={8} md={8} lg={12} xl={12}" />
          </HvGrid>
          <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
            <StyledBox text="xs={4} sm={4} md={4} lg={6} xl={6}" />
          </HvGrid>
          <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
            <StyledBox text="xs={4} sm={4} md={4} lg={6} xl={6}" />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <StyledBox text="xs={1} sm={2} md={2} lg={3} xl={3}" />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <StyledBox text="xs={1} sm={2} md={2} lg={3} xl={3}" />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <StyledBox text="xs={1} sm={2} md={2} lg={3} xl={3}" />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <StyledBox text="xs={1} sm={2} md={2} lg={3} xl={3}" />
          </HvGrid>
        </HvGrid>
      </div>
    </div>
  );
};

Behaviour.parameters = {
  docs: {
    description: {
      story:
        "Change the size of the window to see the grid behaviour. The box will adjust following the define breakpoints.",
    },
  },
};
