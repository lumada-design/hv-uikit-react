import React from "react";
import PropTypes from "prop-types";
import { Cards, List } from "@hitachivantara/uikit-react-icons";
import MultiButton from "../../AssetInventory/Multibutton/Multibutton";
import HvDropdown from "../../Dropdown/Dropdown";
import useStyles from "./styles";

const RightControl = ({
  children,
  _setSortBy,
  values,
  onChangeView,
  onChangeSort,
  sortBy = true,
  viewSelect = true,
}) => {
  const [selectedView, setSelectedView] = React.useState(0);
  // this should be changed when dropdown changes his "values" behaviour
  const [dropdDownValue] = React.useState(values);

  const styles = useStyles();

  const handleChangeView = (_event, viewIndex) => {
    setSelectedView(viewIndex);
    onChangeView?.(viewIndex);
  };

  const handleChangeSort = (value) => {
    _setSortBy([{ id: value?.id }]);
    onChangeSort?.(value);
  };
  return (
    <div className={styles.root}>
      {sortBy && (
        <HvDropdown
          id="sortByDropDown"
          aria-label="Sort by"
          label="Sort by"
          values={dropdDownValue}
          className={styles.sortInput}
          onChange={handleChangeSort}
        />
      )}
      {viewSelect && (
        <MultiButton
          views={[
            { id: "card-button", icon: <Cards />, "aria-label": "Select card view" },
            { id: "list-button", icon: <List />, "aria-label": "Select list view" },
          ]}
          selectedView={selectedView}
          changeView={handleChangeView}
        />
      )}
      {children}
    </div>
  );
};

RightControl.propTypes = {
  /** Children to be rendered. */
  children: PropTypes.node,
  /** Data collection to be listed on the sort field. */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      selected: PropTypes.bool,
    })
  ),
  /** Callback fired when the selected view changes. */
  onChangeView: PropTypes.func,
  /** Callback fired when the selected sort item is changed. */
  onChangeSort: PropTypes.func,
  _setSortBy: PropTypes.func,
  /** Boolean to control whether if the sort input should appears or not. */
  sortBy: PropTypes.bool,
  /** Boolean to control whether if the view selection input should appears or not. */
  viewSelect: PropTypes.bool,
};

export default RightControl;
