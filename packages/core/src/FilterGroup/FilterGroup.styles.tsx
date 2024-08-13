import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvFilterGroup", {
  root: {},
  label: {
    display: "flex",
    alignItems: "flex-start",
  },
  labelContainer: { display: "flex", alignItems: "flex-start" },
  description: {},
  error: {},
});
