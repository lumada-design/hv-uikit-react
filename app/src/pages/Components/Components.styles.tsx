import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

export const styles = {
  component: css({
    padding: theme.space.sm,
    marginBottom: theme.space.lg,
  }),
  header: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.space.sm,
  }),
  content: css({
    paddingLeft: theme.space.md,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  }),
  docs: css({
    padding: theme.spacing(["xs", "md"]),
  }),
  label: css({
    width: "100%",
    cursor: "pointer",
    padding: 5,
    "&:hover": {
      backgroundColor: theme.colors.primary_20,
    },
  }),
};
