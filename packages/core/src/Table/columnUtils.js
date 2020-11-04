import { Down, Up } from "@hv/uikit-react-icons";
import clsx from "clsx";
import isNil from "lodash/isNil";
import React from "react";

import CellWithTooltip from "./CellWithTooltip";

import HvButton from "../Button";

import { buildLink } from "./addins";

/* eslint-disable no-underscore-dangle */

/**
 * A function used to wrap the cell data into a div to contain it adding the ellipsis functionality.
 *
 * @param {Function} format - The formatting function to be executed to format the row value.
 * @param {Number} id - The index to find the required row on the data.
 * @param {Object} classes - The classes to be applied.
 * @returns {function(*): *} A container that has the row value formatted if required.
 */
const wrapper = (format, id) => (data) => (
  <CellWithTooltip data={format ? format(data) : data.row._original[id]} />
);

/**
 *  Set the class responsible for the alignment of the displayed text,
 *  depending of the property "cellType", set in the columns definition.
 *
 * @param {String} cellType - A string that identified the type of alingment required.
 * @param {Object} classes - An object containing he classes to applied depending on the alignment type.
 * @returns {String} - The class to apply.
 */
const setColumnAlignment = (cellType, classes) => {
  switch (cellType) {
    case "alpha-numeric":
      return clsx(classes.alphaNumeric, "alphaNumeric");
    case "link":
      return clsx(classes.alphaNumeric, "link");
    case "numeric":
      return classes.numeric;
    default:
      return classes.centered;
  }
};

/**
 * Adds to the className the sortable class if the header is marked as sortable.
 *
 * @param sortableProp
 * @param existingClassNames
 * @returns {*}
 */
const setHeaderSortableClass = (sortableProp, existingClassNames) =>
  clsx(existingClassNames, sortableProp && "sortable");

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

  if (subElementTemplate) {
    newColumns[0].className = clsx(newColumns[0].className, classes.expand);
    // eslint-disable-next-line react/prop-types
    newColumns[0].Cell = ({ isExpanded, ...rest }) => (
      <>
        <HvButton
          icon
          className={clsx(classes.iconContainer)}
          aria-label="row expander button"
          tabIndex="0"
          onClick={() => toggleExpand(rest.row._viewIndex)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <Up className={classes.separatorContainer} width="10px" height="10px" />
          ) : (
            <Down className={classes.separatorContainer} width="10px" height="10px" />
          )}
        </HvButton>

        <div
          className={clsx(classes.expand, {
            [classes.textContainer]: rest.column.cellType === "alpha-numeric",
            [classes.alphaNumeric]: rest.column.cellType === "alpha-numeric",
            [classes.firstWithNumeric]: rest.column.cellType === "numeric",
          })}
        >
          {rest?.column?.format
            ? rest.column.format(rest.row._original[rest.column.id])
            : rest.row._original[rest.column.id]}
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
  createExpanderButton,
};
