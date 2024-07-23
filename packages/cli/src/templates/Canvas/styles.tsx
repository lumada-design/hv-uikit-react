import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const classes = {
  flow: css({
    width: "100%",
    height: "100%",
    // border style when a node is selected
    [`& .selected > div`]: {
      borderWidth: "2px",
      borderColor: theme.colors.primary_80,
    },
  }),
  flowEmpty: css({ backgroundColor: "transparent" }),
  flowEmptyMessage: css({ color: theme.colors.secondary_80 }),
  tabLabel: css({ display: "flex", alignItems: "center" }),
  root: css({
    height: "100%",
    display: "flex",
    width: "100%",
  }),
  toolbar: css({
    top: `calc(${theme.header.height} + ${theme.header.secondLevelHeight} + ${theme.space.md})`,
  }),
  fullWidth: css({
    right: theme.space.lg,
    marginLeft: "auto",
    marginRight: "auto",
    width: `calc(100% - 2 * ${theme.space.lg})`,
  }),
  minWidth: css({
    right: theme.space.lg,
    width: `calc(100% - 320px - 3 * ${theme.space.lg})`,
  }),
  panel: css({
    top: `calc(${theme.header.height} + ${theme.header.secondLevelHeight})`,
    height: `calc(100% - ${theme.header.height} - ${theme.header.secondLevelHeight})`,
  }),
  toggleIcon: css({ transition: "rotate 0.2s ease" }),
  titleContainer: css({
    display: "flex",
    width: "100%",
  }),
  titleRoot: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
  }),
  dialogTitle: css({
    ...theme.typography.label,
    "& div > div": { margin: 0, padding: 0 },
  }),
};
