/**
 * Filter selected elements.
 *
 * @param {Object} list - the list to filter
 * @returns {Array} - the selected elements
 */
const getSelected = list => list?.filter(elem => elem.selected) || [];

/**
 * Checks if any element of the list is selected.
 *
 * @param list
 * @returns {boolean}
 */
const hasSelected = list => getSelected(list).length > 0;

/**
 * Gets the selection label according to selection.
 *
 * @param {Object} list - the list to filter the selected elements from
 * @param {Object} labels - the labels to extract the textual values for the label
 * @param {Boolean} multiSelect - if "true" the label will have a different format
 *
 * @returns {Object} - the selection label
 */
const getSelectionLabel = (list = [], labels, multiSelect) => {
  const { select, selectSingle } = labels;
  const selected = getSelected(list);

  if (select) return { selected: select };

  if (multiSelect) {
    return {
      selected: selected.length,
      total: list.length
    };
  }
  return { selected: selected.length > 0 ? selected[0].label : selectSingle };
};

export { getSelectionLabel, getSelected, hasSelected };
