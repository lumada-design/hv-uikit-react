import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  panelRight: css({
    width: 260,
    background: theme.colors.atmo1,
    borderLeft: `1px solid ${theme.colors.atmo3}`,
  }),
  title: css({
    margin: "15px 0 0 20px",
  }),
};

export default styles;
