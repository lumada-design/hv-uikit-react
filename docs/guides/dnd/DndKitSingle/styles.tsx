import { css } from "@emotion/css";
import { outlineStyles, theme } from "@hitachivantara/uikit-react-core";

const styles = {
  column: css({
    width: 250,
    padding: theme.space.md,
    borderRadius: theme.radii.round,
  }),
  columnHeader: css({
    marginBottom: theme.space.md,
  }),
  item: css({
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.colors.divider}`,
    borderRadius: theme.radii.base,
    backgroundColor: theme.colors.atmo1,
    margin: theme.spacing("xs", 0),
    "&:focus-visible": {
      ...outlineStyles,
    },
  }),
  itemTitle: css({
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  }),
};

export default styles;
