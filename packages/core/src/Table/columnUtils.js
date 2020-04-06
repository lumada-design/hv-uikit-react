import React from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";

import AngleDown from "@hv/uikit-react-icons/dist/Down";
import AngleUp from "@hv/uikit-react-icons/dist/Up";
import { KeyboardCodes, isKeypress } from "../utils";

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
  return data => <div className={classes.textContainer}>{data.row._original[id]}</div>;
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
      classToApply = clsx(classes.alphaNumeric, "alphaNumeric");
      break;
    case "link":
      classToApply = clsx(classes.alphaNumeric, "link");
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
 * Adds to the className the sortable class if the header is marked as sortable.
 *
 * @param sortableProp
 * @param existingClassNames
 * @returns {*}
 */
const setHeaderSortableClass = (sortableProp, existingClassNames) => {
  if (!isNil(sortableProp) && sortableProp) {
    return clsx(existingClassNames, "sortable");
  }
  return existingClassNames;
};

/**
 * Creates an expander button inside the first column of the table.
 *
 * @param {Object} column - a reference to the React table column object.
 * @param {JSX} subElementTemplate - the expander content that the user wants to add to the table
 * @param {Object} classes - contains the classes to apply to the column.
 * @param {function} toggleExpand - contains the classes to apply to the column.
 * @returns {Object} a modified column.
 */
const createExpanderButton = (columns, subElementTemplate, classes, toggleExpand) => {
  const newColumns = columns;

  const onKeyHandler = (event, rowIndex, toggleExpandCallback) => {
    if (isKeypress(event, KeyboardCodes.Enter) || isKeypress(event, KeyboardCodes.SpaceBar)) {
      event.preventDefault();
      toggleExpandCallback(rowIndex);
    }
  };

  if (subElementTemplate) {
    newColumns[0].className = clsx(newColumns[0].className, classes.expand);
    // eslint-disable-next-line react/prop-types
    newColumns[0].Cell = ({ isExpanded, ...rest }) => (
      <>
        <div
          className={clsx(classes.iconContainer)}
          aria-label="row expander button"
          role="button"
          tabIndex="0"
          onKeyDown={event => onKeyHandler(event, rest.row._viewIndex, toggleExpand)}
          onClick={() => toggleExpand(rest.row._viewIndex)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <AngleUp className={classes.separatorContainer} width="10px" height="10px" />
          ) : (
            <AngleDown className={classes.separatorContainer} width="10px" height="10px" />
          )}
        </div>

        <div
          className={clsx({
            [classes.textContainer]: rest.column.cellType === "alpha-numeric",
            [classes.alphaNumeric]: rest.column.cellType === "alpha-numeric",
            [classes.firstWithNumeric]: rest.column.cellType === "numeric"
          })}
        >
          {/* eslint-disable-next-line no-underscore-dangle */}
          {rest.row._original[rest.column.id]}
        </div>
      </>
    );
  }
  return newColumns;
};

/**
 * Appends classnames necessary classnames for the columns depending on the required functionality or state.
 *
 * @param {Object} column - a reference to the React table column object.
 * @param {Array} colSortedSelected - An array containing the columns to be sorted.
 * @param {Object} classes - contains the classes to apply to the column.
 */
const appendClassnames = (column, colSortedSelected, classes, tableSortable) => {
  const col = column;
  // build the link component if the cell has cellType "link"
  buildLink(col);

  // set the cell content alignment
  const cellTypeClass = setColumnAlignment(col.cellType, classes);

  col.className = clsx(col.className, cellTypeClass);

  // setting the className for the column with the expander
  if (col.expander) {
    col.className = clsx(col.className, "firstExpandable");
  }

  if ((isNil(column.sortable) && tableSortable) || column.sortable) {
    col.className = clsx(col.className, "sortable");
  }

  // checkbox column
  if (col.id === "_selector") {
    const headerClassNames = col.headerClassName;
    col.headerClassName = clsx("checkBox", headerClassNames);
    col.className = clsx(col.className, "checkBox");
  } else if (col.id === "secondaryActions") {
    const headerClassNames = col.headerClassName;
    col.headerClassName = clsx("secondaryAction", headerClassNames);
    col.className = clsx(col.className, "secondaryAction");
  }
  // If the cell isn't checkbox and wasn't overwritten a text container should be introduced to the cell
  else if (!col.Cell) {
    col.Cell = wrapper(col.format, col.id, classes);
  }
};

export {
  wrapper,
  setColumnAlignment,
  setHeaderSortableClass,
  appendClassnames,
  createExpanderButton
};
