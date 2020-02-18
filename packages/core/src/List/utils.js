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

const isItemSelected = (item, newItem) => {
  const selectionKey = item && item.id ? "id" : "label";
  const selectionElement = item && item[selectionKey];
  return newItem[selectionKey] === selectionElement;
};

const checkIcons = list => !!list.filter(elem => elem.iconCallback).length;

const parseState = (list, labels) => {
  const { selectAll, selectionConjunction } = labels;
  const hasLeftIcons = checkIcons(list);
  const selection = list.filter(elem => elem.selected);
  const anySelected = !!selection.length;
  const allSelected = selection.length === list.length;
  const anySelectableSelected = list.some(
    elem => elem.selected || elem.disabled
  );
  const allSelectableSelected = list.every(
    elem => elem.selected || elem.disabled
  );
  const selectionLabel = !anySelected
    ? selectAll
    : `${selection.length} ${selectionConjunction} ${list.length}`;

  return {
    list,
    labels,
    hasLeftIcons,
    anySelected,
    allSelected,
    anySelectableSelected,
    allSelectableSelected,
    selectionLabel,
    selection
  };
};

const parseList = (list, item, props, selectAll) => {
  const {
    multiSelect,
    selectable,
    selectDefault,
    singleSelectionToggle
  } = props;

  let anySelected = false;
  const newList = list.map(elem => {
    const newItem = { ...elem };

    // reset elem item
    if (!multiSelect) {
      newItem.selected = false;
    }

    const selectItem = item ? isItemSelected(item, newItem) : elem.selected;

    if (selectItem && selectable) {
      let selectionState;

      if (multiSelect) {
        selectionState = item ? !elem.selected : true;
      } else {
        selectionState =
          !anySelected &&
          (item && singleSelectionToggle ? !elem.selected : true);
      }

      newItem.selected = selectionState;
      anySelected = true;
    }

    if (typeof selectAll === "boolean" && !elem.disabled)
      newItem.selected = selectAll;

    // normalize item selected prop if not provided
    if (!newItem.selected) newItem.selected = false;

    return newItem;
  });

  // select first item by default when single select and no selection
  if (!multiSelect && !anySelected && selectDefault && selectable) {
    newList[0].selected = true;
  }

  return newList;
};

export { isItemSelected, parseList, parseState };
