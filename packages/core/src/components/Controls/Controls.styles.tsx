import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvControls", {
  root: {
    display: "inline-flex",
    width: "100%",
    justifyContent: "space-between",
  },
  section: { display: "inline-flex", alignItems: "flex-end", gap: 10 },
  rightSection: {},
  leftSection: {},
});
