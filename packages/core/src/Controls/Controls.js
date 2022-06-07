import React from "react";
import PropTypes from "prop-types";
import { Cards, List } from "@hitachivantara/uikit-react-icons";
import { useTable, useSortBy, useAsyncDebounce, useGlobalFilter } from "react-table";
import HvInput from "../Input/Input";
import MultiButton from "../AssetInventory/Multibutton/Multibutton";
import HvDropdown from "../Dropdown/Dropdown";

import useStyles from "./styles";

/** Controls it's a group of features used to control data that can be rendered using different views (table, cards, list). */
const Controls = ({
  onViewChange,
  onSearchChange,
  rightControls,
  leftControls,
  rightControlsProps,
  leftControlsProps,
  data,
  columns,
}) => {
  const [selectedView, setSelectedView] = React.useState(0);
  // this should be changed when dropdown changes his "values" behaviour
  const [dropdDownValue] = React.useState(rightControlsProps?.values);
  const styles = useStyles();

  const { rows, setGlobalFilter, setSortBy } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const onChangeView = (_event, viewIndex) => {
    setSelectedView(viewIndex);
  };

  const onChangeFilter = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  const onChangeSort = (value) => {
    setSortBy([{ id: value?.id }]);
  };

  React.useEffect(() => {
    onSearchChange(rows);
  }, [onSearchChange, rows]);

  const customLeftControls = (component, props) => {
    if (component()) {
      return React.createElement(component, props);
    }
    return null;
  };

  return (
    <div className={styles.root}>
      <div className={styles.leftControl}>
        {customLeftControls(leftControls, leftControlsProps) || (
          <HvInput
            type="search"
            aria-label="Search content"
            placeholder={leftControlsProps?.placeholder}
            onChange={(e) => onChangeFilter(e.target.value)}
          />
        )}
      </div>
      <div className={styles.rightControl}>
        {rightControls && (
          <>
            <HvDropdown
              id="sortByDropDown"
              aria-label="Sort by"
              label="Sort by"
              values={dropdDownValue}
              className={styles.sortInput}
              onChange={onChangeSort}
            />
            <MultiButton
              views={[
                { id: "card-button", icon: <Cards />, "aria-label": "Select card view" },
                { id: "list-button", icon: <List />, "aria-label": "Select list view" },
              ]}
              selectedView={selectedView}
              changeView={onChangeView}
              onViewChange={onViewChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

Controls.propTypes = {
  /** Callback fired when the view type is changed within the left controls. */
  onViewChange: PropTypes.func,
  /** Callback fired when the users starts typing in the input field field within the right controls. */
  onSearchChange: PropTypes.func,
  /** Optional custom functional component to replace the left controls. */
  leftControls: PropTypes.func,
  /** Optional custom properties passed to the left controls.
   * <i>If a custom component is implemented, this property will be forwarded to it. </i>
   */
  leftControlsProps: PropTypes.shape({
    placeholder: PropTypes.string,
  }),
  /** Optional custom functional component to replace the right controls. */
  rightControls: PropTypes.func,
  /** Optional custom properties passed to the right controls.
   * <i>If a custom component is implemented, this property will be forwarded to it. </i>
   */
  rightControlsProps: PropTypes.shape({
    values: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        selected: PropTypes.bool,
      })
    ),
  }),
  /** The data array that you want to display on the table.
   * <b>Must be memoized</b>
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The core columns configuration object for the entire table.
   * <b>Must be memoized</b>
   */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
Controls.defaultProps = {
  onViewChange: () => null,
  onSearchChange: () => null,
  leftControls: () => null,
  rightControls: () => null,
};

export default Controls;
