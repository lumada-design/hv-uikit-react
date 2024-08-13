import { createClasses } from "@hitachivantara/uikit-react-utils";

const name = "HvFilterGroupLeftPanel";

export const { staticClasses, useClasses } = createClasses(name, {
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
});
