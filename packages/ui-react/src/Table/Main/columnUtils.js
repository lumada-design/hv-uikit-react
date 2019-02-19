/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import classNames from "classnames";
import isNil from "lodash/isNil";

import AngleDown from "@hv-ui/icons/core/XS-icons/AngleDown12";
import AngleUp from "@hv-ui/icons/core/XS-icons/AngleUp12";

import { buildLink } from "./addins";

/**
 * When the component is render for the first time the default sorted column doesn't
 * have applied the class "sorted".
 * The class "sorted" is removed from the columns that aren't sorted.
 *
 * @param {Boolean} initiallyLoaded - if it is the first load of the table.
 * @param {Object} column - An object containing information about the column.
 * @param {Array} colSortedSelected - An array containing the columns to be sorted.
 * @returns {String} - The classname to apply.
 */
const markSorted = (column, colSortedSelected) => {
  let columnSorted = column.className;

  if (!columnSorted) {
    columnSorted = "";
  }

  if (isNil(colSortedSelected) || colSortedSelected.length < 1) {
    return columnSorted;
  }

  if (column.id === colSortedSelected[0].id) {
    columnSorted = classNames(columnSorted, "sorted");
  }

  if (!isNil(colSortedSelected) && column.id !== colSortedSelected[0].id) {
    columnSorted = columnSorted.replace("sorted", "");
  }

  return columnSorted;
};

/**
 * A function used to wrap the cell data into a div to contain it adding the ellipsis functionality.
 *
 * @param {Function} format - The formatting function to be executed to format the row value.
 * @param {Number} id - The index to find the required row on the data.
 * @param {Object} classes - The classes to be applied.
 * @returns {JSX} A container that has the row value formatted if required.
 */
const wrapper = (format, id, classes) => {
  if (format) {
    return data => <div className={classes.textContainer}>{format(data)}</div>;
  }
  /* eslint no-underscore-dangle: 0 */
  return data => (
    <div className={classes.textContainer}>{data.row._original[id]}</div>
  );
};

/**
 *  Set the class responsible for the alignment of the displayed text,
 *  depending of the property "cellType", set in the columns definition.
 *
 * @param {String} cellType - A string that identified the type of alingment required.
 * @param {Object} classes - An object containing he classes to applied depending on the alignment type.
 * @returns {String} - The class to apply.
 */
const setColumnAlignment = (cellType, classes) => {
  let classToApply;
  switch (cellType) {
    case "alpha-numeric":
      classToApply = classNames(classes.alphaNumeric, "alphaNumeric");
      break;
    case "link":
      classToApply = classNames(classes.alphaNumeric, "link");
      break;
    case "numeric":
      classToApply = classes.numeric;
      break;
    default:
      classToApply = classes.centered;
  }
  return classToApply;
};

/**
 * Creates an expander button inside the first column of the table.
 *
 * @param {Object} column - a reference to the React table column object.
 * @param {JSX} subElementTemplate - the expander content that the user wants to add to the table
 * @param {Object} classes - contains the classes to apply to the column.
 * @returns {Object} a modified column.
 */
const createExpanderButton = (columns, subElementTemplate, classes) => {
  const newColumn = columns;
  if (subElementTemplate) {
    newColumn[0].sortable = true;
    newColumn[0].expander = true;
    newColumn[0].width = newColumn[1].width;
    // eslint-disable-next-line react/prop-types
    newColumn[0].Expander = ({ isExpanded, ...rest }) => (
      <>
        <div>
          {isExpanded ? (
            <div className={classNames(classes.iconContainer)}>
              <AngleUp />
            </div>
          ) : (
            <div className={classNames(classes.iconContainer)}>
              <AngleDown />
            </div>
          )}
        </div>
        <div
          className={classNames({
            [classes.firstWithNumeric]: rest.column.cellType === "numeric"
          })}
        >
          {/* eslint-disable-next-line no-underscore-dangle */}
          {rest.row._original[rest.column.id]}
        </div>
      </>
    );
  }
  return newColumn;
};

/**
 * Appends classnames necessary classnames for the columns depending on the required functionality or state.
 *
 * @param {Object} column - a reference to the React table column object.
 * @param {Array} colSortedSelected - An array containing the columns to be sorted.
 * @param {Object} classes - contains the classes to apply to the column.
 */
const appendClassnames = (column, colSortedSelected, classes) => {
  const col = column;
  // build the link component if the cell has cellType "link"
  buildLink(col);

  // mark the sorted and clean the unsorted
  const columnSorted = markSorted(col, colSortedSelected);

  // set the cell content alignment
  const cellTypeClass = setColumnAlignment(col.cellType, classes);

  col.className = classNames(columnSorted, cellTypeClass);

  // setting the className for the column with the expander
  if (col.expander) {
    col.className = classNames(col.className, "firstExpandable");
  }

  // checkbox column
  if (col.id === "_selector") {
    const headerClassNames = col.headerClassName;
    col.headerClassName = classNames("checkBox", headerClassNames);
    col.className = classNames(col.className, "checkBox");
  }
  // If the cell isn't checkbox and wasn't overwritten a text container should be introduced to the cell
  else if (!col.Cell) {
    col.Cell = wrapper(col.format, col.id, classes);
  }
};

export {
  markSorted,
  wrapper,
  setColumnAlignment,
  appendClassnames,
  createExpanderButton
};
