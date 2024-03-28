import { theme } from "@hitachivantara/uikit-styles";

import { avatarClasses } from "../Avatar/Avatar";
import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvAvatarGroup", {
  root: {
    display: "flex",
    [`& .${avatarClasses.root}`]: {
      border: `2px solid ${theme.colors.atmo2}`,
      boxSizing: "content-box",
    },
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
});
