import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  grid: css({
    display: "grid",
    gridTemplateColumns: "70px 70px 70px",
    gridGap: 10,
  }),
  list: css({}),
  search: css({
    marginBottom: theme.space.sm,
  }),
  inputRoot: css({
    border: `1px solid ${theme.colors.atmo3}`,
  }),
  accordionRoot: css({
    marginBottom: theme.space.xs,
  }),
  accordionLabel: css({
    marginBottom: 4,
    border: `1px solid transparent`,
    "&:hover": {
      cursor: "pointer",
      background: theme.colors.atmo2,
      border: `1px solid ${theme.colors.atmo3}`,
    },
  }),
};

export default styles;
