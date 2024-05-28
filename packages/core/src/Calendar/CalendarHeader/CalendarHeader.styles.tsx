import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvCalendarHeader", {
  root: {
    paddingBottom: theme.space.md,

    "&$invalid": {
      paddingBottom: 0,
    },
  },
  invalid: {},
  headerDayOfWeek: {
    color: theme.colors.textSubtle,
  },
  headerDate: {},
  input: {},
  inputBorderContainer: {},
  invalidMessageStyling: {},
});
