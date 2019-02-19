/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/**
 * Check if the row is selected based on it's key.
 *
 * @param {Number} key - the key that uniquely identifies the row.
 */
const isSelected = (key, selection) => selection.includes(key);

/**
 * Selects or unselect a row.
 *
 * @param {Number} key - the key that uniquely identifies the row.
 * @param {Array} selection - the array with the selected objects.
 */
const toggleSelection = (key, selection) => {
  // start off with the existing state
  let select = selection;

  const keyIndex = select.indexOf(key);
  // check to see if the key exists
  if (keyIndex >= 0) {
    // it does exist so we will remove it using destructing
    select = [...select.slice(0, keyIndex), ...select.slice(keyIndex + 1)];
  } else {
    // it does not exist so add it
    select.push(key);
  }
  return select;
};

/**
 *  Adds the indeterminate status to the checkbox when necessary.
 *
 * @param {Array} selection - the array with the selected objects.
 * @param {number} recordQuantity - the total records in the table.
 */
const isIndeterminateStatus = (selection, recordQuantity) => {
  const selectionLength = selection.length;
  return selectionLength !== recordQuantity && selectionLength > 0;
};

/**
 * Selects all the avaible rows on the page.
 *
 * @param {String} idForCheckbox - property to be used as unique row identifier, One of the fields of the data.
 * @param {Boolean} selectAll - if the select all is selected or not.
 * @param {Boolean} checkboxTable - reference to the checkbox inside the react table.
 */
const toggleAll = (idForCheckbox, selectAll, checkboxTable) => {
  const selection = [];
  const selectAllToApply = !selectAll;

  if (selectAllToApply) {
    // we need to get at the internals of ReactTable
    const wrappedInstance = checkboxTable.getWrappedInstance();
    // the 'sortedData' property contains the currently accessible records based on the filter and sort
    const currentRecords = wrappedInstance.getResolvedState().sortedData;
    // we just push all the IDs onto the selection array
    currentRecords.forEach(item => {
      // eslint-disable-next-line no-underscore-dangle
      selection.push(item._original[idForCheckbox]);
    });
  }

  return {
    selectAll: selectAllToApply,
    selection
  };
};

export { toggleAll, isIndeterminateStatus, toggleSelection, isSelected };
