import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvCardHeader", {
  root: {
    position: "relative",
    padding: theme.spacing("12px", "xs", "sm", "sm"),
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
    paddingLeft: theme.space.xs,
  },
});
