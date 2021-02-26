/* eslint-disable */
import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import {
  SortXS as Sort,
  SortAscendingXS as SortAsc,
  SortDescendingXS as SortDesc,
} from "@hv/uikit-react-icons";
import { HvTypography } from "../..";
import { KeyboardCodes, isKeypress, setId } from "../../utils";
import styles from "./styles";

/**
 * Returns the corresponding icon for the type of sorting (ascending or descending).
 */
const renderSort = (sortType, columnSortable) => {
  if (sortType) {
    return sortType === "descending" ? <SortDesc /> : <SortAsc />;
  }

  if (columnSortable) {
    return <Sort />;
  }

  return null;
};

const getSortType = (id, sort) => {
  const sortInfo = sort.filter((item) => item.id === id);
  if (sortInfo.length) {
    return sortInfo[0].desc === true ? "descending" : "ascending";
  }

  return undefined;
};

const handleSortChange = (event, colId, onSortChange, sort) => {
  // The table only supports one sorted column
  const newState = [...sort];
  newState[0].id = colId;
  newState[0].desc = !newState[0].desc;
  onSortChange?.(newState);
};

const handleKeyDown = (event, colId, onSortChange, sort) => {
  if (isKeypress(event, KeyboardCodes.Enter) || isKeypress(event, KeyboardCodes.Space)) {
    event.preventDefault();
    handleSortChange(event, colId, onSortChange, sort);
  }
};

const Header = ({ id, classes, column, tableSortable, sort, onSortChange }) => {
  const { id: colId, sortable, cellType, headerText } = column;

  const columnSortable = (sortable == null && tableSortable) || sortable;
  const sortType = getSortType(colId, sort);

  return (
    <div className={clsx(classes.headerContainer)}>
      {columnSortable && (
        <div
          id={setId(id, "column", colId, "sort-button")}
          className={clsx(classes.rtSortIcon, {
            [classes.rtSortIconNumeric]: cellType === "numeric",
          })}
          aria-label={setId(id, "column", colId, "sort-button")}
          role="button"
          tabIndex="0"
          onClick={(event) => handleSortChange(event, colId, onSortChange, sort)}
          onKeyDown={(event) => handleKeyDown(event, colId, onSortChange, sort)}
        >
          {renderSort(sortType, columnSortable)}
        </div>
      )}
      {/* Setter of the styles for the header */}
      <div
        className={clsx(classes.headerTextContainer, {
          [classes.headerSortable]: columnSortable,
          [classes.headerNotSortable]: !columnSortable,
        })}
      >
        <HvTypography
          id={setId(id, "column", colId, "label")}
          variant="highlightText"
          className={clsx(classes.headerProps, {
            [classes.headerAlphaNumeric]: cellType === "alpha-numeric" || cellType === "link",
            [classes.headerNumeric]: cellType === "numeric",
          })}
        >
          {headerText}
        </HvTypography>
      </div>
    </div>
  );
};

export default withStyles(styles, { name: "HvTableHeader" })(Header);
