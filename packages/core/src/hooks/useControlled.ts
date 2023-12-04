// based in https://raw.githubusercontent.com/mui-org/material-ui/next/packages/material-ui/src/utils/useControlled.js
// modifications:
// 1. renamed default to initialState, to convey the same meaning of the useState hook.
// 2. removed the console error when initialState changes; that is acceptable and just ignored, like in useState.
// 3. the console error regarding switching from controlled to uncontrolled (or vice-versa) is sent synchronously
//    so the stacktrace shows the caller
// 4. given that, the hook signature was simplified, no need for metadata

import { useRef, useState, useCallback, SetStateAction } from "react";

// export const useControlled = <T = any>(controlledProp: T, initialState: T) => {
export const useControlled = (controlledProp: any, initialState: any) => {
  const { current: isControlled } = useRef(controlledProp !== undefined);
  const [valueState, setValue] = useState(initialState);
  const value = isControlled ? controlledProp : valueState;

  if (import.meta.env.DEV && isControlled !== (controlledProp !== undefined)) {
    // eslint-disable-next-line no-console
    console.error(
      [
        `A component is changing the ${
          isControlled ? "" : "un"
        }controlled state to be ${isControlled ? "un" : ""}controlled.`,
        "Elements should not switch from uncontrolled to controlled (or vice versa).",
        "Decide between using a controlled or uncontrolled element for the lifetime of the component.",
        "The nature of the state is determined during the first render, it's considered controlled if the value is not `undefined`.",
      ].join("\n")
    );
  }

  const setValueIfUncontrolled = useCallback(
    (newValue: SetStateAction<any>) => {
      if (!isControlled) {
        setValue(newValue);
      }
    },
    [isControlled]
  );

  return [value, setValueIfUncontrolled];
};
