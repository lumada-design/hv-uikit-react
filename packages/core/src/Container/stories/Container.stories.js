/* eslint-disable react/prop-types */
import React from "react";
import { Paper } from "@mui/material";
import { withStyles } from "@mui/styles";
import HvContainer from "../Container";
import useWidth from "../../utils/useWidth";

export default {
  title: "Layout/Container",
  parameters: {
    componentSubtitle: null,
    usage: 'import {HvContainer} from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvContainer,
};

export const Main = () => {
  const styles = (theme) => ({
    root: {
      border: "1px solid",
      borderColor: theme.hv.palette.atmosphere.atmo4,
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
      fontFamily: theme.hv.typography.fontFamily,
      ...theme.hv.typography.normalText,
    },
    paper: {
      padding: theme.hvSpacing(2),
      textAlign: "center",
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      height: 125,
    },
  });

  const width = useWidth();

  const Container = withStyles(styles)(({ classes }) => (
    <HvContainer className={classes.root}>
      <Paper className={classes.paper}>{width}</Paper>
    </HvContainer>
  ));

  return <Container />;
};

export const SmMaxWidth = () => {
  const styles = (theme) => ({
    root: {
      border: "1px solid",
      borderColor: theme.hv.palette.atmosphere.atmo4,
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
      fontFamily: theme.hv.typography.fontFamily,
      ...theme.hv.typography.normalText,
    },
    paper: {
      padding: theme.hvSpacing(2),
      textAlign: "center",
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      height: 125,
    },
  });

  const width = useWidth();

  const Container = withStyles(styles)(({ classes }) => (
    <HvContainer className={classes.root} maxWidth="sm">
      <Paper className={classes.paper}>{width}</Paper>
    </HvContainer>
  ));

  return <Container />;
};

SmMaxWidth.parameters = {
  docs: {
    description: { story: "The Container with its size set to (640)." },
  },
};

export const FullWidth = () => {
  const styles = (theme) => ({
    root: {
      border: "1px solid",
      borderColor: theme.hv.palette.atmosphere.atmo4,
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
      fontFamily: theme.hv.typography.fontFamily,
      ...theme.hv.typography.normalText,
    },
    paper: {
      padding: theme.hvSpacing(2),
      textAlign: "center",
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      height: 125,
    },
  });

  const width = useWidth();

  const Container = withStyles(styles)(({ classes }) => (
    <HvContainer className={classes.root} maxWidth={false}>
      <Paper className={classes.paper}>{width}</Paper>
    </HvContainer>
  ));

  return <Container />;
};

FullWidth.parameters = {
  docs: {
    description: { story: "The Container with no max size." },
  },
};
