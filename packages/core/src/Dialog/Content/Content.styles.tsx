import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDialog-Content", {
  root: {
    padding: `0 ${theme.space.sm} ${theme.space.sm} ${theme.space.sm}`,
    flex: "none",
  },
  textContent: {
    marginLeft: "42px",
    paddingRight: "62px",
    flex: 1,
    overflowY: "auto",
  },
});
