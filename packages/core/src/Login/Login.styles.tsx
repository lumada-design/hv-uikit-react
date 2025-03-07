import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
    background: theme.colors.bgPage,
    marginLeft: "auto",
    maxWidth: 500,
    height: "100%",
  },
});
