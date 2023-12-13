import { css } from "@emotion/css";
import { HvButton, theme } from "@hitachivantara/uikit-react-core";

const styles = {
  button: css({
    backgroundColor: theme.colors.brand,
    ":hover": { backgroundColor: theme.alpha("brand", 0.6) },
  }),
};

export const Alpha = () => (
  <HvButton className={styles.button}>Click me</HvButton>
);
