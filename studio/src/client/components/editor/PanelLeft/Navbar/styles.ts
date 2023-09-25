import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
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
