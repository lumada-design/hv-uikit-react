import React from "react";
import HvContainer from "@hv/uikit-react-core/src/Container";
import { Paper } from "@material-ui/core";
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

const ContainerExample = () => {
  const width = useWidth();
  const classes = useStyles();

  return (
    <HvContainer className={classes.root} maxWidth={false}>
      <Paper className={classes.paper}>{width}</Paper>
    </HvContainer>
  );
};

export default <ContainerExample />;
