import { useState, useEffect } from "react";

const getSelectionPath = (
  data,
  selectedId,
  selection = [],
  idx = -1,
  parent = []
) => {
  data.forEach((item, i) => {
    const hasData = item.data && item.data.length;
    const isSelected = item.id === selectedId;

    if (isSelected)
      selection.push(...(idx > -1 ? [parent[idx].id] : []), item.id);
    if (hasData) getSelectionPath(item.data, selectedId, selection, i, data);
  });

  return selection;
};

const useSelectionPath = (data, selectedId) => {
  const [selectionPath, setSelectionPath] = useState("");

  useEffect(() => {
    const path = getSelectionPath(data, selectedId);
    setSelectionPath(path);
  }, [data, selectedId]);

  return selectionPath;
};

export default useSelectionPath;
