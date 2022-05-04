import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { HvDropdown, setId } from "@hitachivantara/uikit-react-core";
import styleCreator from "./styles";
import { HvControlsContext } from "../context/ControlsContext";

const HvRightControl = ({
  id,
  classes,
  className,
  children,
  values,
  onSort,
  hideSortBy = false,
  sortProps,
  ...others
}) => {
  const [dropDownValues, setDropdownValues] = useState(values);

  const { onSort: onSortHandler } = useContext(HvControlsContext);

  const handleChangeSort = (value) => {
    onSort?.(value);
    onSortHandler?.(value);
    // this should be changed when dropdown changes his "values" behavior
    setDropdownValues((prevValues) =>
      prevValues.map((prevValue) => ({
        ...prevValue,
        selected: prevValue.id === value.id,
      }))
    );
  };
  return (
    <div id={id} className={clsx(className, classes.root)} {...others}>
      {!hideSortBy && (
        <HvDropdown
          id={setId(id, "sort-by-dropdown")}
          values={dropDownValues}
          className={classes.sortDropdown}
          onChange={handleChangeSort}
          singleSelectionToggle={false}
          {...sortProps}
        />
      )}
      {children}
    </div>
  );
};

HvRightControl.propTypes = {
  /** Children to be rendered. */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /** Children to be rendered. */
  children: PropTypes.node,
  /**
   * the classes object to be applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the dropdown in charge of sorting.
     */
    sortDropdown: PropTypes.string,
  }).isRequired,
  /** Data collection to be listed on the sort field. */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      accessor: PropTypes.string,
      label: PropTypes.string,
      selected: PropTypes.bool,
      desc: PropTypes.bool,
    })
  ),
  /** Callback fired when the selected sort item is changed. */
  onSort: PropTypes.func,
  /** Boolean to control whether if the sort input should appears or not. */
  hideSortBy: PropTypes.bool,
  /**
   * Extra props to be passed onto the dropdown
   */
  sortProps: PropTypes.object,
};

export default withStyles(styleCreator, { name: "HvRightControl", withTheme: true })(
  HvRightControl
);
