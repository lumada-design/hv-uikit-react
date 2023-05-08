import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  button: css({
    "&:focus": {
      outline: "none",
    },
  }),
  selected: css({
    background: theme.colors.atmo2,
    "& svg": {
      "& path": {
        fill: `${theme.colors.primary_80} !important`,
      },
    },
  }),
};

export default styles;
