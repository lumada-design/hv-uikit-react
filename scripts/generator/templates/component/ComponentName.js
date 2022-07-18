import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@mui/styles";

import styles from "./styles";

/**
 * ComponentName description/documentation paragraph
 */
const HvComponentName = (props) => {
  const { className, classes, ...others } = props;

  return (
    <div className={clsx(className, classes.root)} {...others}>
      <div>ComponentName</div>
    </div>
  );
};

HvComponentName.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvComponentName" })(HvComponentName);
