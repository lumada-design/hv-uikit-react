import React, { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import TableContext from "./TableContext";
import styles from "./styles";

/**
 * A Table gathers relational data, it displays values arranged to allow quick numerical analysis
 * like comparison and sorting.
 *
 * HvTable component offers a set of HTML-equivalent elements, styled to Design System's specification,
 * for building tables.
 *
 * For better data handling and advanced features we recommend the use of a collection of utility hooks.
 * See the <a href="?id=lab-table-hooks--main&viewMode=docs" target="_self">Table Hooks documentation</a> for more details.
 *
 * PLEASE NOTE: This Table implementation is still a WIP. There might be breaking changes.
 */
const HvTable = forwardRef(function HvTable(props, ref) {
  const { classes, className, stickyHeader = false, ...others } = props;

  const tableContext = useMemo(() => ({ stickyHeader }), [stickyHeader]);

  return (
    <TableContext.Provider value={tableContext}>
      <table
        ref={ref}
        className={clsx(classes.root, className, { [classes.stickyHeader]: stickyHeader })}
        {...others}
      />
    </TableContext.Provider>
  );
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
   * Whether the `HvTable` has a sticky header row
   */
  stickyHeader: PropTypes.bool,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component root class when it has a sticky header.
     */
    stickyHeader: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTable" })(HvTable);
