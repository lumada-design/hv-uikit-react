import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import styles from "./styles";

/**
 * A Table gathers relational data, it displays values arranged to allow quick numerical analysis
 * like comparison and sorting.
 *
 * HvTable component offers a set of HTML-equivalent elements, styled to Design System's specification,
 * for building tables.
 *
 * PLEASE NOTE: This Table implementation is still a WIP. There might be breaking changes.
 */
const HvTable = forwardRef(function HvTable(props, ref) {
  const { classes, className, ...others } = props;

  return <table ref={ref} className={clsx(classes.root, className)} {...others} />;
});

HvTable.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Content to be rendered
   */
  children: PropTypes.node.isRequired,
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

export default withStyles(styles, { name: "HvTable" })(HvTable);
