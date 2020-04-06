/* eslint-disable */
import React from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import Sort from "@hv/uikit-react-icons/dist/SortXS";
import SortDesc from "@hv/uikit-react-icons/dist/SortDescendingXS";
import SortAsc from "@hv/uikit-react-icons/dist/SortAscendingXS";
import { KeyboardCodes, isKeypress } from "../../utils/KeyboardUtils";
import HvTypography from "../../Typography";
import styles from "./styles";

/**
 *
 * Returns the corresponding icon for the type of sorting (ascending or descending).
 *
 * @param id - the used to find the column.
 * @param columnSortable - if the column is sortable or not
 * @param sort - the list of sorted columns
 * @param classes - a JSS object that contains the classes to apply
 * @returns {*} - 'false' if the column doesn't exist.
 */
const getSortedComponent = (sortType, columnSortable, classes) => {
  if (sortType) {
    return sortType === "descending" ? (
      <SortDesc className={classes.box} />
    ) : (
      <SortAsc className={classes.box} />
    );
  }

  if (columnSortable) {
    return <Sort className={classes.box} />;
  }

  return false;
};

const getSortType = (id, sort) => {
  const sortInfo = sort.filter(item => item.id === id);
  if (sortInfo.length) {
    return sortInfo[0].desc === true ? "descending" : "ascending";
  }

  return undefined;
};

const onKeyHandler = (event, id, onSortChange, currentSortedState) => {
  if (isKeypress(event, KeyboardCodes.Enter) || isKeypress(event, KeyboardCodes.SpaceBar)) {
    event.preventDefault();
    // The table only supports one sorted column
    const newState = [...currentSortedState];
    newState[0].id = id;
    newState[0].desc = !newState[0].desc;
    onSortChange(newState);
  }
};

const Header = React.memo(
  ({ tableInternalId, classes, column, tableSortable, sort, onSortChange }) => {
    const { id, sortable, cellType, headerText } = column;

    const columnSortable = (isNil(sortable) && tableSortable) || sortable;

    const sortType = getSortType(id, sort);

    const sortElem = getSortedComponent(sortType, columnSortable, classes);

    return (
      <div className={clsx(classes.headerContainer)}>
        {columnSortable && (
          <div
            id={id != null ? `${tableInternalId}-column-${id}-sort-button` : undefined}
            className={clsx(classes.rtSortIcon, {
              [classes.rtSortIconNumeric]: cellType === "numeric"
            })}
            aria-label={id != null ? `${tableInternalId}-column-${id}-sort-button` : undefined}
            role="button"
            tabIndex="0"
            onKeyDown={event => onKeyHandler(event, id, onSortChange, sort)}
          >
            {sortElem}
          </div>
        )}
        {/* Setter of the styles for the header */}
        <div
          className={clsx(classes.headerTextContainer, {
            [classes.headerSortable]: columnSortable,
            [classes.headerNotSortable]: !columnSortable
          })}
        >
          <HvTypography
            id={id != null ? `${tableInternalId}-column-${id}-label` : undefined}
            variant="highlightText"
            className={clsx(classes.headerProps, {
              [classes.headerAlphaNumeric]: cellType === "alpha-numeric" || cellType === "link",
              [classes.headerNumeric]: cellType === "numeric"
            })}
          >
            {headerText}
          </HvTypography>
        </div>
      </div>
    );
  }
);

export default withStyles(styles, { name: "HvTableHeader" })(Header);
