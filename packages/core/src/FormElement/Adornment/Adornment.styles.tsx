import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvAdornment", {
  root: {
    width: 32,
    height: 30,
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
