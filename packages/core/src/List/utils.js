import { withTooltip } from "..";

const isItemSelected = (item, newItem) => {
  const selectionKey = item && item.id ? "id" : "label";
  const selectionElement = item && item[selectionKey];
  return newItem[selectionKey] === selectionElement;
};

const checkIcons = (list) => !!list.filter((elem) => elem.icon).length;

const parseState = (list) => {
  const hasLeftIcons = checkIcons(list);
  const selection = list.filter((elem) => elem.selected);
  const anySelected = !!selection.length;
  const allSelected = selection.length === list.length;
  const anySelectableSelected = list.some((elem) => elem.selected || elem.disabled);
  const allSelectableSelected = list.every((elem) => elem.selected || elem.disabled);

  return {
    list,
    hasLeftIcons,
    anySelected,
    allSelected,
    anySelectableSelected,
    allSelectableSelected,
    selection,
  };
};

const parseList = (list, item, props, selectAll) => {
  const { multiSelect, selectable, singleSelectionToggle } = props;

  let anySelected = false;
  const newList = list.map((elem) => {
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

  return newList;
};

const wrapperTooltip = (hasTooltips, Component, label) => {
  const ComponentFunction = () => Component;
  return hasTooltips ? withTooltip(ComponentFunction, label) : ComponentFunction;
};

export { isItemSelected, parseList, parseState, wrapperTooltip };
