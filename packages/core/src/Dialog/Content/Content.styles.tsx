import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDialog-Content", {
  root: {
    padding: theme.spacing(0, "sm", "sm"),
  },
  textContent: {
    paddingLeft: `calc(42px + ${theme.space.sm})`,
    paddingRight: "62px",
    overflowY: "auto",
  },
  contentBorder: {
    borderTop: "var(--content-border)",
    borderBottom: "var(--content-border)",
  },
});
