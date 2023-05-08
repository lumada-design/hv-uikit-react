import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  panelLeft: css({
    display: "flex",
    borderRight: `1px solid ${theme.colors.atmo3}`,
  }),
  navBar: css({
    display: "flex",
    width: 55,
    flexDirection: "column",
    rowGap: theme.space.xs,
    padding: `${theme.space.sm} ${theme.space.xs}`,
    background: theme.colors.atmo1,
  }),
};

export default styles;
