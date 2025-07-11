import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCardHeader", {
  root: {
    position: "relative",
    padding: theme.spacing("12px", "xs", "sm", "sm"),
    gap: theme.space.xs,
    alignItems: "center",
    display: "flex",
  },
  titleShort: {
    ...theme.typography.label,
    fontFamily: theme.fontFamily.body,
  },
  title: {
    ...theme.typography.label,
    fontFamily: theme.fontFamily.body,
  },
  subheader: {
    ...theme.typography.caption1,
    fontFamily: theme.fontFamily.body,
  },
  content: {},
  action: {
    margin: 0,
  },
});
