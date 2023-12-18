import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvLogin", {
  root: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    padding: 0,
    margin: "-1px 0 0 0",
  },
  formContainer: {
    background: theme.colors.atmo2,
    marginLeft: "auto",
    maxWidth: 500,
    height: "100%",
  },
});
