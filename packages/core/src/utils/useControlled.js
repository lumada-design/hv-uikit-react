// based in https://raw.githubusercontent.com/mui-org/material-ui/next/packages/material-ui/src/utils/useControlled.js
// modifications:
// 1. renamed default to initialState, to convey the same meaning of the useState hook.
// 2. removed the console error when initialState changes; that is acceptable and just ignored, like in useState.
// 3. the console error regarding switching from controlled to uncontrolled (or vice-versa) is sent synchronously
//    so the stacktrace shows the caller
// 4. given that, the hook signature was simplified, no need for metadata

import * as React from "react";

export default function useControlled(controlledProp, initialState) {
  const { current: isControlled } = React.useRef(controlledProp !== undefined);
  const [valueState, setValue] = React.useState(initialState);
  const value = isControlled ? controlledProp : valueState;

  if (
    process.env.NODE_ENV !== "production" &&
    isControlled !== (controlledProp !== undefined)
  ) {
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

  const setValueIfUncontrolled = React.useCallback(
    (newValue) => {
      if (!isControlled) {
        setValue(newValue);
      }
    },
    [isControlled]
  );

  return [value, setValueIfUncontrolled];
}
