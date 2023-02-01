import { useState, useEffect } from "react";
import { HvListValue } from "./List";

export default function useSelectableList(defaultList: HvListValue[] = []) {
  const [list, setList] = useState<HvListValue[]>(defaultList);
  const [selection, setSelection] = useState<HvListValue[]>([]);

  useEffect(() => {
    setSelection(
      (list as HvListValue[]).filter((elem: HvListValue) => elem.selected)
    );
  }, [list]);

  return [list, setList, selection] as const;
}
