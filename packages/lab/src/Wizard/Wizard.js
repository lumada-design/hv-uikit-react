import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import WizardContext from "./WizardContext";
import WizardContainer from "./WizardContainer";
import WizardTitle from "./WizardTitle";
import WizardContent from "./WizardContent";
import WizardActions from "./WizardActions";

import styles from "./styles";

const HvWizard = ({
  className,
  children,
  onClose,
  handleSubmit,
  title,
  open,
  skippable = true,
  loading = false,
  hasSummary = false,
  summaryContent,
  labels = {
    cancel: "Cancel",
    next: "Next",
    previous: "Previous",
    skip: "Skip",
    submit: "Submit",
    summary: "Summary",
  },
  fixedHeight = false,
  customStep,
  ...others
}) => {
  const [context, setContext] = React.useState({});
  const [summary, setSummary] = React.useState(null);
  const [tab, setTab] = React.useState(0);

  const contextValue = React.useMemo(
    () => ({
      context,
      setContext,
      summary,
      setSummary,
    }),
    [context, summary]
  );

  React.useEffect(() => {
    if (!open) {
      setTab(0);
    }
  }, [open]);

  const handleClose = React.useCallback(
    (evt, reason) => {
      if (reason !== "backdropClick") {
        onClose(evt, reason);
      }
    },
    [onClose]
  );

  return (
    <WizardContext.Provider value={contextValue}>
      <WizardContainer className={className} handleClose={handleClose} open={open} {...others}>
        <WizardTitle
          title={title}
          hasSummary={hasSummary}
          labels={labels}
          tab={tab}
          changeTab={setTab}
          customStep={customStep}
        />
        <WizardContent
          loading={loading}
          fixedHeight={fixedHeight}
          tab={tab}
          summaryContent={summaryContent}
        >
          {children}
        </WizardContent>
        <WizardActions
          loading={loading}
          skippable={skippable}
          labels={labels}
          tab={tab}
          changeTab={setTab}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </WizardContainer>
    </WizardContext.Provider>
  );
};

HvWizard.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Current state of the Wizard.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function executed on close.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Function executed on submit.
   */
  handleSubmit: PropTypes.func.isRequired,
  /**
   * Enables the skip button.
   */
  skippable: PropTypes.bool,
  /**
   * Title for the wizard.
   */
  title: PropTypes.string,
  /**
   * Shows the summary button.
   */
  hasSummary: PropTypes.bool,
  /**
   * The content of the summary.
   */
  summaryContent: PropTypes.node,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * An object containing all the labels for the wizard.
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
    /**
     * Summary button label.
     */
    summary: PropTypes.string,
  }),
  /**
   * Forces minimum height to the component.
   */
  fixedHeight: PropTypes.bool,
  /**
   * Whether the loading animation is shown.
   */
  loading: PropTypes.bool,
  /**
   * Custom object to define type, size and width of the StepNavigation component
   */
  customStep: PropTypes.shape({
    /**
     * Type of step navigation. Values = {"Simple", "Default"}.
     */
    type: PropTypes.oneOf(["Simple", "Default"]),
    /**
     * Sets one of the standard sizes of the steps. Values = {"XS", "SM", "MD", "LG", "XL"}
     */
    stepSize: PropTypes.oneOf(["XS", "SM", "MD", "LG", "XL"]),
    /**
     * Width of the component element on each breakpoint screen resolution.
     */
    width: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number,
    }),
  }),
};

export default withStyles(styles, { name: "HvWizard" })(HvWizard);
