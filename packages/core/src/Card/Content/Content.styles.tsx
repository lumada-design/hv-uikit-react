import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCardContent", {
  content: {
    padding: `0 ${theme.space.sm} 15px ${theme.space.sm}`,
    "&:last-child": {
      paddingBottom: theme.space.sm,
    },
  },
});
