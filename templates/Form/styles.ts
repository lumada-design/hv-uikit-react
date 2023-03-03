import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  section: css({
    marginBottom: theme.space.lg,
  }),
  footer: css({
    width: "100%",
    height: 80,
    backgroundColor: theme.colors.atmo1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: theme.space.sm,
    position: "fixed",
    left: 0,
    bottom: 0,
    zIndex: 2,
  }),
};

export default styles;
