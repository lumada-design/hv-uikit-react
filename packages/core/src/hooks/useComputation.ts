import { useRef, useState } from "react";

export const useComputation = (valueFn, valueFallback?) => {
  const computed = useRef<any>(null);
  const [value, setValue] = useState(valueFallback);

  const computeValue = () => {
    if (!computed.current) {
      setValue(valueFn?.());
      computed.current = true;
    }
  };

  return [value, computeValue];
};
