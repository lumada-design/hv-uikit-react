import React from "react";
import HvContainer from "@hv/uikit-react-core/src/Container";
import HvTypography from "@hv/uikit-react-core/src/Typography";
import HvGrid from "@hv/uikit-react-core/src/Grid";
import { Hidden, Paper } from "@material-ui/core";
import useWidth from "@hv/uikit-react-core/src/utils/useWidth";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid",
    backgroundColor: theme.hv.palette.base.base1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    height: 125
  }
}));

const Breakpoints = () => {
  const width = useWidth();
  const classes = useStyles();

  return (
    <>
      <HvTypography>{`Current Width: ${width}`}</HvTypography>
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
    </>
  );
};

export default <Breakpoints />;
