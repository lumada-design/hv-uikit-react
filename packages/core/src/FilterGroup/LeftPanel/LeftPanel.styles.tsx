import { createClasses } from "../../utils/classes";

const name = "HvFilterGroupLeftPanel";

export const { staticClasses, useClasses } = createClasses(name, {
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
});
