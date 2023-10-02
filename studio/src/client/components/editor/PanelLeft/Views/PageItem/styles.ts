import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  item: css({
    display: "flex",
    alignItems: "center",
    border: `1px solid transparent`,
    borderRadius: theme.radii.base,
    "&:hover": {
      cursor: "pointer",
      background: theme.colors.atmo2,
      border: `1px solid ${theme.colors.atmo3}`,
    },
    marginBottom: 2,
  }),
  selected: css({
    background: theme.colors.primary_20,
    border: `1px solid ${theme.colors.atmo3}`,
  }),
  icon: css({
    opacity: 0,
  }),
  show: css({
    opacity: 1,
  }),
  drag: css({
    cursor: "grab",
    "&:hover": {
      "& svg": {
        "& path": {
          fill: `${theme.colors.primary_80} !important`,
        },
      },
    },
    "&:active:hover": {
      cursor: "grabbing",
    },
  }),
};

export default styles;
