import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

const styles = {
  root: css({
    height: "100%",
    padding: theme.space.xl,
    background: `linear-gradient(70deg, ${theme.colors.atmo2} 55%, transparent 55%), linear-gradient(180deg, ${theme.colors.brand}, #000)`,
  }),
  glossaryContainer: css({
    margin: theme.spacing("sm", 0),
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
  }),
  imageContainer: css({
    display: "flex",
    alignItems: "center",

    img: { maxHeight: "450px" },
  }),
};

export default styles;
