/* eslint-disable no-underscore-dangle */

/**
 * Check if the row is selected based on it's key.
 *
 * @param {Number} key - the key that uniquely identifies the row.
 */
export const isSelected = (key, selection) => selection.includes(key);

/**
 * Selects or unselect a row.
 *
 * @param {Number} key - the key that uniquely identifies the row.
 * @param {Array} selection - the array with the selected objects.
 */
export const toggleSelection = (key, selection) => {
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
export const isIndeterminateStatus = (selection, recordQuantity) => {
  const selectionLength = selection.length;
  return selectionLength !== recordQuantity && selectionLength > 0;
};

/**
 * Selects all the available rows on the page.
 *
 * @param {String} idForCheckbox - property to be used as unique row identifier, One of the fields of the data.
 * @param {Boolean} tableRef - reference to the react table.
 * @param {Array} pageInfo - pagination info array with [ currentPage, currentPageSize ].
 */
export const selectPage = (idForCheckbox, tableRef, pageInfo = []) => {
  const {
    currentPage: page = 0,
    currentPageSize = Number.MAX_SAFE_INTEGER,
    paginationServerSide,
  } = pageInfo;

  // we need to get at the internals of ReactTable
  const wrappedInstance = tableRef.current.getWrappedInstance();
  // the 'sortedData' property contains the currently accessible records based on the filter and sort
  const currentRecords = wrappedInstance.getResolvedState().sortedData;

  // we just map the IDs onto the result array
  const selectedIds = currentRecords.map((item) => item._original[idForCheckbox]);

  const newSelection = paginationServerSide
    ? selectedIds
    : selectedIds.slice(page * currentPageSize, (page + 1) * currentPageSize);

  return newSelection;
};
