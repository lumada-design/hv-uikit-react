import { useCallback, useContext, useEffect, useState } from "react";

import {
  ExtractNames,
  HvBaseProps,
  HvButton,
  HvDialogActions,
  HvGrid,
} from "@hitachivantara/uikit-react-core";
import { Backwards, Forwards } from "@hitachivantara/uikit-react-icons";

import { HvWizardContext, HvWizardTabs } from "../WizardContext";
import { staticClasses, useClasses } from "./WizardActions.styles";

export { staticClasses as wizardActionsClasses };

export type HvWizardActionsClasses = ExtractNames<typeof useClasses>;

export interface HvWizardActionsProps extends HvBaseProps {
  /** Function to handle the cancel button. */
  handleClose: (
    event: React.SyntheticEvent,
    reason?: "escapeKeyDown" | "backdropClick"
  ) => void;
  /** Function to handle the submit button. Also sends the current context state. */
  handleSubmit: (context: any) => void;
  /** An object containing all the labels for the wizard actions component. */
  labels?: {
    /** Cancel button label. */
    cancel?: string;
    /** Skip button label. */
    skip?: string;
    /** Previous button label. */
    previous?: string;
    /** Next button label. */
    next?: string;
    /** Submit button label. */
    submit?: string;
  };
  /** Whether the submit button is disabled. */
  loading?: boolean;
  /** Enables the skip button. */
  skippable?: boolean;
  /** A Jss Object used to override or extend the styles applied to the empty state Wizard. */
  classes?: HvWizardActionsClasses;
}

export const HvWizardActions = ({
  classes: classesProp,
  handleClose,
  handleSubmit,
  loading = false,
  skippable = false,
  labels = {
    cancel: "Cancel",
    next: "Next",
    previous: "Previous",
    skip: "Skip",
    submit: "Submit",
  },
}: HvWizardActionsProps) => {
  const { classes, cx } = useClasses(classesProp);

  const { context, setContext, tab, setTab } = useContext(HvWizardContext);
  const [pages, setPages] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const contextEntries = Object.entries(context);
    if (contextEntries.length) {
      setPages(contextEntries.length);

      const validWizard = Object.entries(context).every(
        ([, value]) => value?.valid
      );
      if (validWizard !== canSubmit) {
        setCanSubmit(validWizard);
      }
    }
  }, [context, canSubmit, setCanSubmit, setPages]);

  const lastPage = pages - 1;
  const isLastPage = tab >= lastPage;

  const handleSkip = useCallback(() => {
    setContext((c) =>
      Object.entries(c).reduce(
        (acc, [key, child]) => ({
          ...acc,
          [+key]: {
            ...child,
            valid: child?.valid !== false,
          },
        }),
        {} as HvWizardTabs
      )
    );
    setTab(lastPage);
  }, [setTab, lastPage, setContext]);

  const handleSubmitInternal = useCallback(
    () => handleSubmit(context),
    [handleSubmit, context]
  );

  return (
    <HvDialogActions className={classes.actionsContainer}>
      <HvGrid>
        <HvButton
          variant="secondaryGhost"
          onClick={handleClose}
          className={classes.buttonWidth}
        >
          {`${labels.cancel ?? "Cancel"}`}
        </HvButton>
        {skippable && (
          <HvButton
            variant="secondaryGhost"
            disabled={isLastPage}
            className={classes.buttonWidth}
            onClick={handleSkip}
          >
            {`${labels.skip ?? "Skip"}`}
          </HvButton>
        )}
      </HvGrid>
      <HvGrid className={classes.buttonsContainer}>
        <HvButton
          variant="secondaryGhost"
          className={classes.buttonWidth}
          disabled={tab <= 0}
          onClick={() => setTab((t) => t - 1)}
          startIcon={<Backwards />}
        >
          {`${labels.previous ?? "Previous"}`}
        </HvButton>
        {isLastPage ? (
          <HvButton
            variant="primary"
            className={classes.buttonWidth}
            disabled={loading || !canSubmit}
            onClick={handleSubmitInternal}
          >
            {`${labels.submit ?? "Submit"}`}
          </HvButton>
        ) : (
          <HvButton
            variant="secondaryGhost"
            className={cx(classes.buttonWidth, classes.buttonSpacing)}
            onClick={() => setTab((t) => t + 1)}
            disabled={!skippable && !context?.[tab]?.valid}
            endIcon={<Forwards />}
          >
            {`${labels.next ?? "Next"}`}
          </HvButton>
        )}
      </HvGrid>
    </HvDialogActions>
  );
};
