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
 * Extract from the records the values that are both disabled and selected.
 *
 * @param {Array} records - a simplification of the table's current values.
 */
const getSelectedDisabledRecordIds = (records) =>
  records.filter((record) => record.disabled && record.selected).map((record) => record.id);

/**
 * gets all the values in the table ignoring the rows that are disabled.
 *
 * @param {Array} records - a simplification of the table's current values.
 */
const getEnabledRecordIds = (records) =>
  records.filter((record) => !record?.disabled).map((record) => record?.id);

/**
 * Cuts the records array to only present what is visible to the user.
 *
 * @param {Object} pageInfo - an object that represents the current configuration for the pagination.
 * @param {Array} records - a simplification of the table's current values.
 */
const sliceRecordsToPage = (pageInfo = {}, records) => {
  const {
    currentPage: page = 0,
    currentPageSize = Number.MAX_SAFE_INTEGER,
    paginationServerSide,
  } = pageInfo;

  return paginationServerSide
    ? records
    : records.slice(page * currentPageSize, (page + 1) * currentPageSize);
};
/**
 * Selects the visible page and avoids the disabled values.
 *
 * @param {Array} records - a simplification of the table's current values.
 * @param {Object} pageInfo - an object that represents the current configuration for the pagination.
 */
const getEnabledRecordIdsInPage = (records, pageInfo) => {
  const slicedRecords = sliceRecordsToPage(pageInfo, records);
  return getEnabledRecordIds(slicedRecords);
};

/**
 * Selects the visible page and appends the selected disabled values.
 *
 * @param {Array} records - a simplification of the table's current values.
 * @param {Object} pageInfo - an object that represents the current configuration for the pagination.
 */
const getSelectedRecordIdsInPage = (records, pageInfo) => {
  let selectedIds;
  const disabledSelectedIds = getSelectedDisabledRecordIds(records);
  selectedIds = getEnabledRecordIdsInPage(records, pageInfo);
  selectedIds = selectedIds.concat(disabledSelectedIds);
  return selectedIds;
};

/**
 * Parse table data and returns rows state.
 *
 * @param {Object} tableRef - The react reference for the table.
 * @param {String} idForCheckbox - property to be used as unique row identifier, One of the fields of the data.
 * @param {Array} currentSelection - The current selected ids.
 */
const parseTableData = (tableRef, idForCheckbox, currentSelection) => {
  const tableData = tableRef.current.getWrappedInstance().getResolvedState().sortedData;

  return tableData.map((row) => {
    const id = row._original[idForCheckbox];

    return {
      id,
      disabled: row?._original?.checkboxProps?.disabled,
      selected: currentSelection.includes(id),
    };
  });
};

/**
 * Returns the page selection according to the rows state.
 *
 * @param {String} idForCheckbox - property to be used as unique row identifier, One of the fields of the data.
 * @param {Boolean} tableRef - reference to the react table.
 * @param {Array} pageInfo - pagination info array with [ currentPage, currentPageSize ].
 * @param {Array} currentSelection - The current selected ids.
 * @param {Boolean} allSelected - If the current selected values represent the whole data.
 */
export const getPageSelection = (
  idForCheckbox,
  tableRef,
  pageInfo,
  currentSelection = [],
  allSelected = false
) => {
  const records = parseTableData(tableRef, idForCheckbox, currentSelection);
  const noSelected = !records.some((record) => record.selected);
  const allEnabled = !records.some((record) => record.disabled);
  const allSelectedDisabled = records
    .filter((record) => record.selected)
    .every((record) => record.disabled);

  if ((!noSelected && allEnabled && pageInfo !== undefined) || (allSelected && allEnabled))
    return [];

  if (allSelectedDisabled || (pageInfo === undefined && !allSelected))
    return getSelectedRecordIdsInPage(records, pageInfo);

  // There is a mixture of selection in the page so the user wants to deselect everything except the disabled values
  return getSelectedDisabledRecordIds(records);
};
