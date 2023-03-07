import { css } from "emotion";
import { theme } from "@hitachivantara/uikit-styles";

export const styles = {
  content: css({
    padding: `0 ${theme.space.sm} 15px ${theme.space.sm}`,
    "&:last-child": {
      paddingBottom: theme.space.sm,
    },
  }),
};
