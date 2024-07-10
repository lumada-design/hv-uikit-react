import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const classes = {
  separator: css({
    height: 30,
    width: 1,
    backgroundColor: theme.colors.atmo4,
    margin: `0 ${theme.space.xs}`,
  }),
  flow: css({ width: "100%", height: "100%" }),
  absoluteFull: css({
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: `calc(100% - 2 * ${theme.space.md})`,
  }),
  absoluteMin: css({
    right: theme.space.md,
    width: `calc(100% - 320px - 2 * ${theme.space.md})`,
  }),
  toggleIcon: css({ transition: "rotate 0.2s ease" }),
  titleContainer: css({
    display: "flex",
    width: "100%",
  }),
  dialogTitle: css({
    ...theme.typography.label,
    "& div > div": { margin: 0, padding: 0 },
  }),
};
