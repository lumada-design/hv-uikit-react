import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { actionsGenericClasses } from "../../ActionsGeneric";

export const { useClasses, staticClasses } = createClasses(
  "HvSnackbar-Content",
  {
    root: {
      width: "310px",
      minHeight: "52px",
      maxHeight: "92px",
      padding: theme.space.xs,
      boxShadow: "none",
      flexWrap: "nowrap",
    },
    success: {
      backgroundColor: theme.colors.positive_20,
    },
    error: {
      backgroundColor: theme.colors.negative_20,
    },
    default: {
      backgroundColor: theme.colors.neutral_20,
    },
    warning: {
      backgroundColor: theme.colors.warning_20,
    },
    message: {
      padding: 0,
      width: "100%",
      display: "flex",
      alignItems: "center",
      minHeight: "32px",
      color: theme.colors.base_dark,
      fontFamily: theme.fontFamily.body,
    },
    /** @deprecated use `classes.message` instead */
    messageSpan: {},
    messageText: {
      paddingLeft: theme.space.xs,
      maxHeight: "72px",
      wordBreak: "break-word",
      textWrap: "balance",
      overflow: "hidden",
    },
    action: {
      textAlign: "right",
      paddingLeft: theme.space.xs,
      marginLeft: "auto",
      marginRight: 0,
      [`& .${actionsGenericClasses.button}`]: {
        borderColor: theme.colors.base_dark,
        color: theme.colors.base_dark,
        "&:hover": {
          borderColor: theme.colors.base_dark,
        },
      },
    },
    iconVariant: {},
  },
);
