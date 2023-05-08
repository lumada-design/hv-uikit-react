import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  panel: css({
    width: 250,
    marginLeft: 3,
    background: theme.colors.atmo1,
  }),
  header: css({
    display: "flex",
    alignItems: "center",
    padding: theme.space.xs,
    background: theme.colors.backgroundColor,
    textTransform: "capitalize",
  }),
  content: css({
    padding: 10,
    height: `calc(100vh - 100px)`,
    overflowY: "visible",
    overflowX: "hidden",
  }),
};

export default styles;
