import { css } from "@emotion/css";
import { outlineStyles, theme } from "@hitachivantara/uikit-react-core";

const styles = {
  column: css({
    width: "100%",
    borderRadius: theme.radii.round,
  }),
  columnHeader: css({
    marginBottom: theme.space.md,
  }),
  item: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.colors.atmo4}`,
    borderRadius: theme.radii.round,
    backgroundColor: theme.colors.atmo1,
    margin: theme.spacing("xs", 0),
    padding: 4,
    height: "unset",
    "&:focus-visible": {
      ...outlineStyles,
    },
  }),
  itemTitle: css({
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  }),
  icon: css({
    borderRadius: theme.radii.base,
    backgroundColor: theme.palette.green[100],
    "& svg .color0": {
      fill: theme.palette.green[700],
    },
  }),
};

export default styles;
