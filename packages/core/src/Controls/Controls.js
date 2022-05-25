import React from "react";
import PropTypes from "prop-types";
import { Cards, List } from "@hitachivantara/uikit-react-icons";
// import {
//   useTable,
//   useSortBy,
//   useGlobalFilter,
//   useAsyncDebounce,
//   setGlobalFilter,
// } from "react-table";
import HvInput from "../Input/Input";
import MultiButton from "../AssetInventory/Multibutton/Multibutton";
import HvDropdown from "../Dropdown/Dropdown";

import useStyles from "./styles";

const Controls = ({
  onViewChange,
  rightControls,
  leftControls,
  leftControlsProps,
  rightControlsProps,
  // data,
  // columns,
}) => {
  const [selectedView, setSelectedView] = React.useState(0);
  const styles = useStyles();

  // const { rows } = useTable(
  //   {
  //     columns,
  //     data,
  //   },
  //   useSortBy,
  //   useGlobalFilter
  // );

  const onChangeView = (_event, viewIndex) => {
    setSelectedView(viewIndex);
  };

  // const onChangeFilter = useAsyncDebounce((value) => {
  //   setGlobalFilter(value || undefined);
  // }, 200);

  return (
    <div className={styles.root}>
      {leftControls && (
        <div className={styles.leftControl}>
          <HvInput
            type="search"
            aria-label="Search content"
            placeholder={leftControlsProps?.placeholder}
            // onChange={(e) => onChangeFilter(e)}
          />
        </div>
      )}
      {rightControls && (
        <div className={styles.rightControl}>
          <HvDropdown
            id="sortByDropDown"
            aria-label="Sort by"
            label="Sort by"
            values={rightControlsProps?.values}
            className={styles.sortInput}
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
        </div>
      )}
    </div>
  );
};

Controls.propTypes = {
  onViewChange: PropTypes.func,
  leftControls: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  leftControlsProps: PropTypes.shape({
    placeholder: PropTypes.string,
  }),
  rightControls: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  rightControlsProps: PropTypes.shape({
    values: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        selected: PropTypes.bool,
      })
    ),
  }),
  //  data: PropTypes.object,
  // columns: PropTypes.arrayOf(PropTypes.object),
};
Controls.defaultProps = {
  onViewChange: () => null,
  rightControls: true,
  leftControls: true,
};

export default Controls;
