import { useState, useEffect } from "react";

export default function useSelectableList(defaultList = []) {
  const [list, setList] = useState(defaultList);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    setSelection(list.filter(elem => elem.selected));
  }, [list]);

  return [list, setList, selection];
}
