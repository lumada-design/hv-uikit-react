import { useEffect, useState } from "react";
import { HvNavigationItemProp } from "components";

const getSelectionPath = (
  data: HvNavigationItemProp[] | undefined,
  selectedId: string,
  selection: string[] = [],
  idx: number = -1,
  parent: HvNavigationItemProp[] = []
): string[] => {
  data?.forEach((item: HvNavigationItemProp, i) => {
    const hasData = item.data && item.data.length;
    const isSelected = item.id === selectedId;

    if (isSelected)
      selection.push(...(idx > -1 ? [parent[idx].id] : []), item.id);
    if (hasData) getSelectionPath(item.data, selectedId, selection, i, data);
  });

  return selection;
};

export const useSelectionPath = (data, selectedId): string[] => {
  const [selectionPath, setSelectionPath] = useState<string[]>([]);

  useEffect(() => {
    const path = getSelectionPath(data, selectedId);
    setSelectionPath(path);
  }, [data, selectedId]);

  return selectionPath;
};
