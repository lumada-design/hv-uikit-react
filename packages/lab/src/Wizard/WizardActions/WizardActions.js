import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import { HvButton, HvDialogActions, HvGrid } from "@hitachivantara/uikit-react-core";
import { Backwards, Forwards } from "@hitachivantara/uikit-react-icons";
import HvWizardContext from "../WizardContext";

import styles from "./styles";

const HvWizardActions = ({
  classes,
  handleClose,
  handleSubmit,
  changeTab,
  tab,
  loading = false,
  skippable = false,
  labels = {
    cancel: "Cancel",
    next: "Next",
    previous: "Previous",
    skip: "Skip",
    submit: "Submit",
  },
}) => {
  const { context, setContext } = React.useContext(HvWizardContext);
  const [pages, setPages] = React.useState(0);
  const [canSubmit, setCanSubmit] = React.useState(false);

  React.useEffect(() => {
    const contextEntries = Object.entries(context);
    if (contextEntries.length) {
      setPages(contextEntries.length);

      const validWizard = Object.entries(context).every(([, value]) => value.valid);
      if (validWizard !== canSubmit) {
        setCanSubmit(validWizard);
      }
    }
  }, [context]); // eslint-disable-line react-hooks/exhaustive-deps

  const lastPage = pages - 1;
  const isLastPage = tab >= lastPage;

  const handleSkip = React.useCallback(() => {
    const skippedContext = Object.entries(context).map(([, child]) => ({
      ...child,
      valid: child.valid !== false,
    }));
    setContext(skippedContext);
    changeTab(lastPage);
  }, [changeTab, context, lastPage, setContext]);
  const handleSubmitInternal = React.useCallback(
    () => handleSubmit(context),
    [handleSubmit, context]
  );

  return (
    <HvDialogActions className={classes.actionsContainer}>
      <HvGrid>
        <HvButton category="ghost" onClick={handleClose} className={classes.buttonWidth}>
          {`${labels.cancel ?? "Cancel"}`}
        </HvButton>
        {skippable && (
          <HvButton
            category="ghost"
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
          category="ghost"
          className={classes.buttonWidth}
          disabled={tab <= 0}
          onClick={() => changeTab((t) => t - 1)}
        >
          <Backwards />
          {`${labels.previous ?? "Previous"}`}
        </HvButton>

        {isLastPage ? (
          <HvButton
            category="primary"
            className={classes.buttonWidth}
            disabled={loading || !canSubmit}
            onClick={handleSubmitInternal}
          >
            {`${labels.submit ?? "Submit"}`}
          </HvButton>
        ) : (
          <HvButton
            category="ghost"
            className={clsx(classes.buttonWidth, classes.buttonSpacing)}
            onClick={() => changeTab((t) => t + 1)}
            disabled={!skippable && !context?.[tab]?.valid}
          >
            {`${labels.next ?? "Next"}`}
            <Forwards />
          </HvButton>
        )}
      </HvGrid>
    </HvDialogActions>
  );
};

HvWizardActions.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component which contains the groups of buttons.
     */
    actionsContainer: PropTypes.string,
    /**
     * Styles applied to the component which contains the buttons.
     */
    buttonsContainer: PropTypes.string,
    /**
     * Styles applied to the Button component to override its width.
     */
    buttonWidth: PropTypes.string,
    /**
     * Styles applied to some Button components to override its left padding.
     */
    buttonSpacing: PropTypes.string,
  }).isRequired,
  /**
   * Current tab to check if it's last page or first to disable previous button and swap between next and submit button.
   */
  tab: PropTypes.number.isRequired,
  /**
   * Function to change the tab when pressing previous and next buttons.
   */
  changeTab: PropTypes.func.isRequired,
  /**
   * Function to handle the cancel button.
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Function to handle the submit button. Also sends the current context state.
   */
  handleSubmit: PropTypes.func.isRequired,
  /**
   * An object containing all the labels for the wizard actions component.
   */
  labels: PropTypes.shape({
    /**
     * Cancel button label.
     */
    cancel: PropTypes.string,
    /**
     * Skip button label.
     */
    skip: PropTypes.string,
    /**
     * Previous button label.
     */
    previous: PropTypes.string,
    /**
     * Next button label.
     */
    next: PropTypes.string,
    /**
     * Submit button label.
     */
    submit: PropTypes.string,
  }),
  /**
   * Whether the submit button is disabled.
   */
  loading: PropTypes.bool,
  /**
   * Enables the skip button.
   */
  skippable: PropTypes.bool,
};

export default withStyles(styles, { name: "HvWizardActions" })(HvWizardActions);
