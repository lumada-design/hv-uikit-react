import { useCallback, useContext, useEffect, useState } from "react";
import { ClassNames } from "@emotion/react";
import { clsx } from "clsx";
import {
  HvBaseProps,
  HvButton,
  HvDialogActions,
  HvGrid,
} from "@hitachivantara/uikit-react-core";
import { Backwards, Forwards } from "@hitachivantara/uikit-react-icons";
import wizardActionsClasses, {
  HvWizardActionsClasses,
} from "./wizardActionsClasses";
import { styles } from "./WizardActions.styles";
import { HvWizardContext } from "../WizardContext/WizardContext";

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
  classes,
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
  const { context, updateContext, tab, setTab } = useContext(HvWizardContext);
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
  }, [context]);

  const lastPage = pages - 1;
  const isLastPage = tab >= lastPage;

  const handleSkip = useCallback(() => {
    const skippedContext = Object.entries(context).map(([, child]) => ({
      ...child,
      valid: child?.valid !== false,
    }));

    updateContext(skippedContext);
    setTab(lastPage);
  }, [setTab, context, lastPage, updateContext]);

  const handleSubmitInternal = useCallback(
    () => handleSubmit(context),
    [handleSubmit, context]
  );

  const onCloseHander = useCallback((event) => {
    const clearContext = Object.entries(context).map(([, child]) => ({
      ...child,
      touched: false,
    }));

    updateContext(clearContext);
    setTab(0);
    handleClose?.(event);
  }, []);

  return (
    <ClassNames>
      {({ css }) => (
        <HvDialogActions
          className={clsx(
            classes?.actionsContainer,
            wizardActionsClasses.actionsContainer,
            css(styles.actionsContainer)
          )}
        >
          <HvGrid>
            <HvButton
              variant="secondaryGhost"
              onClick={onCloseHander}
              className={clsx(
                classes?.buttonWidth,
                wizardActionsClasses.buttonWidth,
                css(styles.buttonWidth)
              )}
            >
              {`${labels.cancel ?? "Cancel"}`}
            </HvButton>
            {skippable && (
              <HvButton
                variant="secondaryGhost"
                disabled={isLastPage}
                className={clsx(
                  classes?.buttonWidth,
                  wizardActionsClasses.buttonWidth,
                  css(styles.buttonWidth)
                )}
                onClick={handleSkip}
              >
                {`${labels.skip ?? "Skip"}`}
              </HvButton>
            )}
          </HvGrid>
          <HvGrid
            className={clsx(
              classes?.buttonsContainer,
              wizardActionsClasses.buttonsContainer,
              css(styles.buttonsContainer)
            )}
          >
            <HvButton
              variant="secondaryGhost"
              className={clsx(
                classes?.buttonWidth,
                wizardActionsClasses.buttonWidth,
                css(styles.buttonWidth)
              )}
              disabled={tab <= 0}
              onClick={() => setTab((t) => t - 1)}
              startIcon={<Backwards />}
            >
              {`${labels.previous ?? "Previous"}`}
            </HvButton>
            {isLastPage ? (
              <HvButton
                variant="primary"
                className={clsx(
                  classes?.buttonWidth,
                  wizardActionsClasses.buttonWidth,
                  css(styles.buttonWidth)
                )}
                disabled={loading || !canSubmit}
                onClick={handleSubmitInternal}
              >
                {`${labels.submit ?? "Submit"}`}
              </HvButton>
            ) : (
              <HvButton
                variant="secondaryGhost"
                className={clsx(
                  classes?.buttonWidth,
                  wizardActionsClasses.buttonWidth,
                  css(styles.buttonWidth),
                  classes?.buttonSpacing,
                  wizardActionsClasses.buttonSpacing,
                  css(styles.buttonSpacing)
                )}
                onClick={() => setTab((t) => t + 1)}
                disabled={!skippable && !context?.[tab]?.valid}
                endIcon={<Forwards />}
              >
                {`${labels.next ?? "Next"}`}
              </HvButton>
            )}
          </HvGrid>
        </HvDialogActions>
      )}
    </ClassNames>
  );
};
