import { createClasses } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvWizardTitle", {
  root: {
    backgroundColor: theme.colors.bgPage,
    justifyContent: "space-between",
    paddingRight: theme.space.sm,
  },
  /** @deprecated use `classes.root` */
  headerContainer: {},
  /** @deprecated use `classes.root` */
  messageContainer: {},
  /** @deprecated use `classes.root` */
  titleContainer: {},
  summaryButton: {},
  /** @deprecated use `classes.summaryButton` */
  buttonWidth: {},
  /** @deprecated use `classes.summaryButton` */
  rootSummaryButton: {},
  stepContainer: {
    margin: "auto",
  },
});
