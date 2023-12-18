import { HvListValue } from "../List";

import { HvDropdownLabelsProps } from "./types";

/** Filter selected elements. */
const getSelected = (list: HvListValue[] = []) =>
  list.filter((elem) => elem.selected);

/** Checks if any element of the list is selected. */
const hasSelected = (list: HvListValue[]) => getSelected(list).length > 0;

/** Gets the selection label according to selection. */
const getSelectionLabel = (
  labels: HvDropdownLabelsProps | undefined,
  placeholder: string,
  multiSelect: boolean,
  list: HvListValue[] = []
) => {
  const { select } = labels || {};
  const selected = getSelected(list);

  if (select) return { selected: select };

  if (multiSelect) {
    return {
      selected: selected.length,
      total: list.length,
    };
  }
  return { selected: selected.length > 0 ? selected[0].label : placeholder };
};

export { getSelectionLabel, getSelected, hasSelected };
