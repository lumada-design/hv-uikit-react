import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDialog-Content", {
  root: {
    padding: theme.spacing(0, "sm", "sm"),
  },
  textContent: {
    marginLeft: "42px",
    paddingRight: "62px",
    overflowY: "auto",
  },
});
