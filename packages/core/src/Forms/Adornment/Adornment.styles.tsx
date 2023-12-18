import { outlineStyles } from "../../utils/focusUtils";
import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvAdornment", {
  root: {},
  icon: { width: 32, height: 32 },
  adornment: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
  },
  adornmentIcon: { cursor: "default", pointerEvents: "none" },
  hideIcon: { display: "none" },
  adornmentButton: {
    cursor: "pointer",
    "&:focus": {
      ...outlineStyles,
    },
  },
});
