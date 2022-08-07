import React from "react";

/**
 * Add the expander element to the first column. This way the expander element doesn't create
 * a single column for itself but is introduced along side the data in the first column.
 *
 * @param {Array} columns - The array that contains the columns in the table.
 * @param {JSX} subElementTemplate - the expander template provided by the user.
 * @param {Object} classes - the classes to be applied to the expander container.
 * @returns {JSX|Array} - The expander
 */
const expander = (subElementTemplate, classes) => {
  return subElementTemplate
    ? (row) => <div className={classes.subComponentContainer}>{subElementTemplate(row)}</div>
    : undefined;
};

export default expander;
