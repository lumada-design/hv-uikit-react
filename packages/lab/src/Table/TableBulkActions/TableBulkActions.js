import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import { HvBulkActions } from "@hv/uikit-react-core";

import styles from "./styles";

/**
 * `HvTableBulkActions` is a wrapper of `HvBulkActions` that handles table bulk selection and action handling
 * given a `react-table` instance: https://react-table.tanstack.com/docs/api/useTable#instance-properties
 *
 * It implements the Design System specification for row selection. If you have a different use case,
 * please implement it using `HvBulkActions` directly, or create your own `TableBulkActions`.
 */
const HvTableBulkActions = (props) => {
  const { className, classes, rtInstance = {}, ...others } = props;
  const {
    toggleAllRowsSelected,
    toggleAllPageRowsSelected,
    page,
    rows,
    selectedFlatRows,
  } = rtInstance;

  const isPaginated = !!page;
  const handleSelectAll = () => {
    if (!isPaginated) return toggleAllRowsSelected();

    const anySelected = rows.some((row) => row.isSelected);
    if (anySelected) return toggleAllRowsSelected(false);

    return toggleAllPageRowsSelected();
  };

  const handleSelectAllPages = () => toggleAllRowsSelected();

  return (
    <HvBulkActions
      className={clsx(className, classes.root)}
      numTotal={rows.length}
      numSelected={selectedFlatRows.length}
      showSelectAllPages={isPaginated}
      onSelectAll={handleSelectAll}
      onSelectAllPages={handleSelectAllPages}
      {...others}
    />
  );
};

HvTableBulkActions.propTypes = {
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

export default withStyles(styles, { name: "HvTableBulkActions" })(HvTableBulkActions);
