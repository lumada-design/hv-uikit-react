import { css } from "@emotion/css";
import { theme, outlineStyles } from "@hitachivantara/uikit-react-core";

const styles = {
  columnsContainer: css({
    display: "flex",
    gap: theme.space.sm,
  }),
  column: css({
    flex: 1,
    minWidth: 100,
    maxWidth: 250,
    padding: theme.space.md,
    borderRadius: theme.radii.round,
  }),
  columnHeader: css({
    marginBottom: theme.space.md,
    "&:hover": {
      cursor: "grab",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  }),
  item: css({
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.colors.atmo4}`,
    borderRadius: theme.radii.base,
    backgroundColor: theme.colors.atmo1,
    margin: theme.spacing("xs", 0),
    "&:hover": {
      cursor: "grab",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  }),
  itemTitle: css({
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  }),
  handle: css({}),
};

export default styles;
