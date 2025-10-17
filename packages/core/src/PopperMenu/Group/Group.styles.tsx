import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses(
  "HvPopperMenuGroup",
  {
    root: {
      borderTop: `1px solid ${theme.colors.borderSubtle}`,
      paddingTop: theme.space.xs,
      marginTop: theme.space.xs,
      marginBottom: theme.space.xs,
    },
    title: {
      padding: theme.space.xxs,
    },
  },
);
