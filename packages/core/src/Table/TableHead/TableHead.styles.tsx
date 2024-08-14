import { createClasses } from "@hitachivantara/uikit-react-utils";

export const { staticClasses, useClasses } = createClasses("HvTableHead", {
  root: {},
  stickyHeader: { position: "sticky", zIndex: 3, top: 0 },
});
