import { createClasses } from "@hitachivantara/uikit-react-utils";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvFocus", {
  root: {},
  selected: {},
  disabled: {},
  focusDisabled: {
    outline: "none",
    "& *:focus": {
      outline: "none",
    },
    "& *": {
      outline: "none !important",
    },
  },
  focused: {
    ...outlineStyles,
    "@media (-webkit-min-device-pixel-ratio:0)": {
      ...outlineStyles,
    },
  },
  focus: {},
});
