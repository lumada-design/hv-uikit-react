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
    },
    success: {
      backgroundColor: theme.colors.successDimmed,
    },
    error: {
      backgroundColor: theme.colors.errorDimmed,
    },
    default: {
      backgroundColor: theme.colors.neutralDimmed,
    },
    warning: {
      backgroundColor: theme.colors.warningDimmed,
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
  },
);
