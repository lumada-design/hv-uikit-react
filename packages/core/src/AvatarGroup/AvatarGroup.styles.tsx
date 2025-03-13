import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { avatarClasses } from "../Avatar/Avatar";

export const { staticClasses, useClasses } = createClasses("HvAvatarGroup", {
  root: {
    display: "flex",
    [`& .${avatarClasses.root}`]: {
      border: `2px solid ${theme.colors.bgPage}`,
      boxSizing: "content-box",
    },
    [`& .${avatarClasses.container}`]: {
      padding: 2,
    },
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    [`& .${avatarClasses.container}`]: {
      "&:not(:first-of-type)": {
        marginLeft: "var(--spacing)",
      },
    },
    "&$toBack": {
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
      [`& .${avatarClasses.container}`]: {
        "&:last-of-type": {
          marginLeft: 0,
        },
        "&:not(:last-of-type)": {
          marginLeft: "var(--spacing)",
        },
      },
    },
  },
  column: {
    flexDirection: "column",
    [`& .${avatarClasses.container}`]: {
      "&:not(:first-of-type)": {
        marginTop: "var(--spacing)",
      },
    },
    "&$toBack": {
      flexDirection: "column-reverse",
      [`& .${avatarClasses.container}`]: {
        "&:last-of-type": {
          marginTop: 0,
        },
        "&:not(:last-of-type)": {
          marginTop: "var(--spacing)",
        },
      },
    },
  },
  highlight: {
    [`& .${avatarClasses.container}:hover`]: {
      zIndex: theme.zIndices.popover,
    },
  },
  toBack: {},
});
