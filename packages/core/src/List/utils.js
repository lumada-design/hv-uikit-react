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
  const anySelectableSelected = list.some(elem => elem.selected || elem.disabled);
  const allSelectableSelected = list.every(elem => elem.selected || elem.disabled);
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
  const { multiSelect, selectable, selectDefault, singleSelectionToggle } = props;

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
        selectionState = !anySelected && (item && singleSelectionToggle ? !elem.selected : true);
      }

      newItem.selected = selectionState;
      anySelected = true;
    }

    if (typeof selectAll === "boolean" && !elem.disabled) newItem.selected = selectAll;

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
