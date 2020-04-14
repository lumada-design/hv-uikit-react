/**
 * Filter selected elements.
 *
 * @param {Object} list - the list to filter
 * @returns {Array} - the selected elements
 */
const getSelected = list => (list ? list.filter(elem => elem.selected) : []);

/**
 * Gets the selection label according to selection.
 *
 * @param {Object} list - the list to filter the selected elements from
 * @param {Object} labels - the labels to extract the textual values for the label
 * @param {Boolean} multiselect - if "true" the label will have a different format
 *
 * @returns {String} - the selection label
 */
const getSelectionLabel = (list, labels, multiSelect) => {
  const selected = getSelected(list);
  const hasSelection = selected.length > 0;
  const isSingleSelection = selected.length === 1;

  let selectionLabel = multiSelect ? labels.selectAll : labels.select;

  if (hasSelection && isSingleSelection) {
    selectionLabel = selected[0].label;
  } else if (hasSelection && multiSelect) {
    selectionLabel = `${labels.multiSelectionAction} ${selected.length} ${labels.multiSelectionConjunction} ${list.length}`;
  }

  return selectionLabel;
};

export { getSelectionLabel, getSelected };
