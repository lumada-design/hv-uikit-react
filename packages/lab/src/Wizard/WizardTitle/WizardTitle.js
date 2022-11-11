import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { HvButton, HvDialogTitle, HvGrid, HvTypography } from "@hitachivantara/uikit-react-core";
import { Report } from "@hitachivantara/uikit-react-icons";
import { HvStepNavigation } from "@hitachivantara/uikit-react-lab";
import HvWizardCleanContainer from "../WizardCleanContainer";
import HvWizardContext from "../WizardContext";

import styles from "./styles";

const switchTabState = (state, currentTab, index) => {
  if (index === currentTab) return "Current";
  if (state.valid) return "Completed";
  if (state.valid === null) return "Enabled";
  if (state.touched && state.valid === false) return "Failed";
  // "Disabled"
  // "Pending"
  return "Enabled";
};

const HvWizardTitle = ({
  title,
  hasSummary = false,
  labels = {},
  tab,
  classes,
  changeTab,
  customStep = {},
  fullscreen,
  className,
}) => {
  const { context, summary, setSummary } = React.useContext(HvWizardContext);
  const [steps, setSteps] = React.useState([]);

  React.useEffect(() => {
    if (summary === null && hasSummary) {
      setSummary(false);
    }

    return () => {
      setSummary?.(false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const contextArray = Object.entries(context);
    if (contextArray.length) {
      const updatedSteps = contextArray.map(([, childState], index) => ({
        title: childState.name ?? `${index + 1}`,
        state: switchTabState(childState, tab, index),
        onClick: () => changeTab(index),
      }));

      setSteps(updatedSteps);
    }
  }, [context, tab, changeTab]);

  const toggleSummary = () => {
    setSummary((oldSummary) => !oldSummary);
  };

  const Container = fullscreen ? HvWizardCleanContainer : HvDialogTitle;

  return (
    <Container
      className={clsx(classes.headerContainer, className)}
      classes={{ messageContainer: classes.messageContainer }}
    >
      <HvGrid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        {title && (
          <HvTypography variant="xsTitle" component="h3">
            {title}
          </HvTypography>
        )}
        {!!steps.length && (
          <HvStepNavigation
            className={classes.stepContainer}
            steps={steps}
            type={customStep?.type ?? "Default"}
            stepSize={customStep?.stepSize ?? "XS"}
            width={customStep?.width ?? { xs: 200, sm: 350, md: 600, lg: 800 }}
          />
        )}
        {hasSummary && (
          <HvButton
            category="secondary"
            className={classes.buttonWidth}
            classes={{ root: classes.rootSummaryButton }}
            onClick={toggleSummary}
          >
            <Report /> {`${labels.summary ?? "Summary"}`}
          </HvButton>
        )}
      </HvGrid>
    </Container>
  );
};

HvWizardTitle.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the header container.
     */
    headerContainer: PropTypes.string,
    /**
     * Styles applied to override the Dialog Title styles.
     */
    messageContainer: PropTypes.string,
    /**
     * Styles applied to the header content container.
     */
    titleContainer: PropTypes.string,
    /**
     * Styles applied to the Button component to override its width.
     */
    buttonWidth: PropTypes.string,
    /**
     * Styles applied to the Button component to override its right padding.
     */
    rootSummaryButton: PropTypes.string,
    /**
     *
     */
    stepContainer: PropTypes.string,
  }),
  /**
   * Title for the wizard.
   */
  title: PropTypes.string,
  /**
   * Shows the summary button.
   */
  hasSummary: PropTypes.bool,
  /**
   * An object containing all the labels for the wizard header.
   */
  labels: PropTypes.shape({
    /**
     * Summary button label.
     */
    summary: PropTypes.string,
  }),
  /**
   * Current tab to check if it's last page or first to disable previous button and swap between next and submit button.
   */
  tab: PropTypes.number.isRequired,
  /**
   * Function to change the tab when pressing previous and next buttons.
   */
  changeTab: PropTypes.func.isRequired,
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
  /**
   * If fullscreen is true we remove Dialog references
   */
  fullscreen: PropTypes.bool,
  /**
   * Styles applied to the component container
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: "HvWizardTitle" })(HvWizardTitle);
