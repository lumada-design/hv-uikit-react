import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDialog-Title", {
  root: { padding: theme.space.sm, margin: 0 },
  fullscreen: {},
  messageContainer: { display: "flex", alignItems: "center" },
  textWithIcon: {
    marginLeft: theme.space.xs,
    // 32px is the icon width
    marginRight: `calc(32px + ${theme.space.xs})`,
  },
  titleText: {},
});
