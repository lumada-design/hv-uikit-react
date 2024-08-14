import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const name = "HvBannerMessageContainer";

export const { staticClasses, useClasses } = createClasses(name, {
  message: {
    color: theme.colors.base_dark,
    wordBreak: "break-word",
    maxWidth: "700px",
    overflow: "hidden",
    marginRight: 10,
  },
  iconContainer: {
    marginRight: theme.space.xs,
    marginLeft: -theme.space.xs,
  },
  actionMessageContainer: {
    flex: "0 0 auto",
  },
});
