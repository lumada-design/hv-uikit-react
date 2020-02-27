import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  title: {
    ...theme.hv.typography.mTitle,
    marginBottom: 20
  },
  block1: {
    width: 700,
    ...theme.hv.typography.sTitle,
    marginBottom: 30,
    fontSize: 16,
    lineHeight: "26px"
  },
  block2: {
    width: 700,
    ...theme.hv.typography.sTitle,
    marginBottom: 30,
    fontSize: 16,
    lineHeight: "26px"
  },
  block3: {
    margin: "5px 0 0 20px"
  },
  span: {
    ...theme.hv.typography.mTitle,
    marginBottom: 30,
    fontSize: 16
  }
});

const About = ({ classes, config }) => (
  <>
    <div className={classes.title}>About lab</div>
    <div className={classes.block1}>
      This package hosts the incubator components that are not yet ready to move
      to the core.
    </div>
  </>
);

export default withStyles(styles, { withTheme: true })(About);
