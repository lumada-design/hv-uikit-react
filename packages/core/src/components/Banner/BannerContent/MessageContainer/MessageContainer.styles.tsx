import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvMessageContainerClasses } from "./messageContainerClasses";

export const styles: Partial<
  Record<keyof HvMessageContainerClasses, CSSInterpolation>
> = {
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
};
