/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    selectionLabel = `${labels.multiSelectionAction} ${selected.length} ${
      labels.multiSelectionConjunction
    } ${list.length}`;
  }

  return selectionLabel;
};

export { getSelectionLabel, getSelected };
