import React from "react";
import PropTypes from "prop-types";
import { HvTypography } from "@hv/uikit-react-core/dist";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * A footer component for identification, still in development
 */
const HvFooter = props => {
  const {
    classes,
    labelLeftName = "Hitachi Vantara",
    labelRightName = `© Hitachi Vantara Corporation ${new Date().getFullYear()}. All Rights Reserved.`
  } = props;

  return (
    <div className={classes.root}>
      <HvTypography className={classes.labelLeft}>{labelLeftName}</HvTypography>
      <HvTypography className={classes.labelRight}>{labelRightName}</HvTypography>
    </div>
  );
};

HvFooter.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to label on the left.
     */
    labelLeft: PropTypes.string,
    /**
     *  Styles applied to label on the right.
     */
    labelRight: PropTypes.string
  }).isRequired,
  labelLeftName: PropTypes.string,
  labelRightName: PropTypes.string
};

export default withStyles(styles, { name: "HvFooter" })(HvFooter);
