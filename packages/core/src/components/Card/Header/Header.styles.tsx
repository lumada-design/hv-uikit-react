import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvCardHeader", {
  root: { padding: `15px ${theme.space.sm}`, position: "relative" },
  titleShort: {
    fontFamily: theme.fontFamily.body,
    marginRight: "30px",
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
    position: "absolute",
    right: 20,
    marginTop: 0,
    marginRight: "0px",
    paddingLeft: theme.space.xs,
    top: "15px",
  },
});
