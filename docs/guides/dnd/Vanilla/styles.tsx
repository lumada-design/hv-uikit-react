import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

const styles = {
  column: css({
    width: 250,
    padding: theme.space.md,
    borderRadius: theme.radii.round,
  }),
  columnHeader: css({
    marginBottom: theme.space.md,
    "&:hover": {
      cursor: "grab",
    },
  }),
  item: css({
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.colors.divider}`,
    borderRadius: theme.radii.base,
    backgroundColor: theme.colors.atmo1,
    marginBottom: theme.space.xs,
    "&:hover": {
      cursor: "grab",
    },
  }),
  itemTitle: css({
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  }),
  itemDragging: css({
    border: `2px solid ${theme.colors.primary}`,
  }),
  handle: css({
    "&:hover": {
      cursor: "grab",
    },
  }),
  placeholder: css({
    height: 2,
    backgroundColor: theme.colors.primary,
    margin: theme.spacing("xs", 0),
  }),
};

export default styles;
