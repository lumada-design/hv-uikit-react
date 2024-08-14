import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvRightControl", {
  root: { display: "inline-flex", gap: 10 },
  sortDropdown: { minWidth: 200 },
});
