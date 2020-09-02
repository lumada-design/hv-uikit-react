import { useRef } from "react";

export default function useUpdated(defaultUpdated = false) {
  const updated = useRef(defaultUpdated);

  const setUpdated = (val = true) => {
    updated.current = val;
  };

  return [updated.current, setUpdated];
}
