import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTimePickerUnit", {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    ...theme.typography.title3,
  },

  separator: {
    width: 8,
  },

  periodToggle: {
    height: 40,
    width: 40,
  },

  element: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },

  input: {
    ...theme.typography.title3,
    fontWeight: 600,
    textAlign: "center",
    height: 40,
    width: 40,
    padding: 0,
    margin: 0,
    "&::placeholder": {
      fontSize: 16,
      fontWeight: 600,
    },
  },
  inputRoot: {
    width: 40,
    height: 40,
  },

  subtractIcon: {
    marginTop: theme.space.xs,
  },
  inputContainer: {
    minWidth: 40,
    maxWidth: 40,
  },
  inputBorderContainer: {
    top: 40,
  },
});
