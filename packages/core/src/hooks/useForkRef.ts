// copied from https://github.com/mui-org/material-ui/blob/03bd73be34424cb2cd17ac602def9ad2b9642de4/packages/material-ui-utils/src/useForkRef.js
import { useMemo } from "react";

const setRef = (ref: any, value: any) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

export const useForkRef = (refA: any, refB: any) => {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: any) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
};
