import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import { HvPagination } from "@hv/uikit-react-core";

import styles from "./styles";

/**
 * `HvTablePagination` is a wrapper of `HvPagination` that automatically handles table pagination
 * given a `react-table` instance: https://react-table.tanstack.com/docs/api/useTable#instance-properties
 */
const HvTablePagination = (props) => {
  const { classes, className, rtInstance = {}, ...others } = props;
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageSize, pageIndex },
  } = rtInstance;

  return (
    <HvPagination
      className={clsx(className, classes.root)}
      canPrevious={canPreviousPage}
      canNext={canNextPage}
      pages={pageOptions.length}
      page={pageIndex}
      pageSize={pageSize}
      onPageChange={gotoPage}
      onPageSizeChange={setPageSize}
      {...others}
    />
  );
};

HvTablePagination.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * React Table useTable instance
   */
  rtInstance: PropTypes.instanceOf(Object),
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

export default withStyles(styles, { name: "HvTablePagination" })(HvTablePagination);
