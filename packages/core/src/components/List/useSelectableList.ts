import { useState, useMemo } from "react";
import { HvListValue } from ".";

export default function useSelectableList(defaultList: HvListValue[] = []) {
  const [list, setList] = useState(defaultList);

  const selection = useMemo(() => list.filter((elem) => elem.selected), [list]);

  return [list, setList, selection] as const;
}
