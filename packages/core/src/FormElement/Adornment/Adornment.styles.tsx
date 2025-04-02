import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvAdornment", {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 30,
    flexShrink: 0,
  },
  /** @deprecated use `classes.root` */
  icon: {},
  /** @deprecated use `classes.root` */
  adornment: {},
  /** @deprecated use `classes.root` */
  adornmentIcon: {},
  hideIcon: { display: "none" },
  /** @deprecated use `classes.root` */
  adornmentButton: {},
  disabled: {},
});
