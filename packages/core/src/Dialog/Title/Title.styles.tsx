import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDialog-Title", {
  root: {
    padding: theme.space.sm,
    paddingRight: 32 + 16, // close icon padding
    backgroundColor: "inherit",
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  },
  fullscreen: {},
  /** @deprecated use `classes.root` instead  */
  messageContainer: {},
  // TODO: consider deprecating
  textWithIcon: {},
  /** @deprecated use `classes.root` instead */
  titleText: {},
});
