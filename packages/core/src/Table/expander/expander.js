import React from "react";

/**
 * Add the expander element to the first column. This way the expander element doesn't create
 * a single column for itself but is introduced along side the data in the first column.
 *
 * @param {Array} columns - The array that contains the columns in the tabble.
 * @param {JSX} subElementTemplate - the expander template provided by the user.
 * @param {Object} classes - the clases to be applied to the expander container.
 * @returns {JSX|Array} - The expander
 */
const expander = (subElementTemplate, classes) => {
  let newSubComponent;
  if (subElementTemplate) {
    newSubComponent = row => {
      const ele = subElementTemplate(row);
      return <div className={classes.subComponentContainer}>{ele}</div>;
    };
  }
  return newSubComponent;
};

export default expander;
