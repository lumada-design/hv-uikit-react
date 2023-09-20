import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";
import { actionsGenericClasses } from "@core/components/ActionsGeneric";

export const { useClasses, staticClasses } = createClasses(
  "HvSnackbar-Content",
  {
    root: {
      width: "310px",
      minHeight: "52px",
      maxHeight: "92px",
      padding: theme.space.xs,
      boxShadow: "none",
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
    },
    messageSpan: {
      display: "flex",
      alignItems: "center",
      minHeight: "32px",
    },
    messageText: {
      paddingLeft: theme.space.xs,
      color: theme.colors.base_dark,
      fontFamily: theme.fontFamily.body,
      maxHeight: "72px",
      wordBreak: "break-word",
      textWrap: "balance",
      overflow: "hidden",
    },
    action: {
      textAlign: "right",
      paddingLeft: theme.space.xs,
      marginLeft: "auto",
      [`& .${actionsGenericClasses.button}`]: {
        borderColor: theme.colors.base_dark,
        color: theme.colors.base_dark,
        "&:hover": {
          borderColor: theme.colors.base_dark,
        },
      },
    },
    iconVariant: {},
  }
);
