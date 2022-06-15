import React from "react";
import PropTypes from "prop-types";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import RightControl from "./RightControl";
import LeftControl from "./LeftControl";

import useStyles from "./styles";

// eslint-disable-next-line react/prop-types
const LeftControls = ({ children, ...otherProps }) => (
  <LeftControl {...otherProps}>{children}</LeftControl>
);
// eslint-disable-next-line react/prop-types
const RightControls = ({ children, ...otherProps }) => (
  <RightControl {...otherProps}>{children}</RightControl>
);

/** Controls it's a group of features used to control data that can be rendered using different views (table, cards, list). */
const Controls = ({ onSearchChange, data, columns, children }) => {
  const styles = useStyles();

  const { rows, setGlobalFilter, setSortBy } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  React.useEffect(() => {
    onSearchChange?.(rows);
  }, [onSearchChange, rows]);

  let rightControl;
  let leftControl;

  React.Children.forEach(children, (child) => {
    if (child?.type === RightControls) {
      rightControl = child;
    }

    if (child?.type === LeftControls) {
      leftControl = child;
    }
  });

  return (
    <div className={styles.root}>
      <div className={styles.leftControl}>
        {leftControl &&
          React.cloneElement(leftControl, {
            _setGlobalFilter: setGlobalFilter,
            onSearchChange,
          })}
      </div>
      <div className={styles.rightControl}>
        {rightControl && React.cloneElement(rightControl, { _setSortBy: setSortBy })}
      </div>
    </div>
  );
};

Controls.LeftControls = LeftControls;
Controls.RightControls = RightControls;

Controls.propTypes = {
  /** Children to be rendered. */
  children: PropTypes.node,
  /** Callback fired when the users starts typing in the input field field within the right controls. */
  onSearchChange: PropTypes.func,
  /** The data array that you want to display on the table.
   * <b>Must be memoized</b>
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The core columns configuration object for the entire table.
   * <b>Must be memoized</b>
   */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Controls;
