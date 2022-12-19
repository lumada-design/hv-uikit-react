import { useEffect, useState } from "react";
import { NavigationItemProp } from "components";

const getSelectionPath = (
  data: NavigationItemProp[] | undefined,
  selectedId: string,
  selection: string[] = [],
  idx: number = -1,
  parent: NavigationItemProp[] = []
): string[] => {
  data?.forEach((item: NavigationItemProp, i) => {
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
