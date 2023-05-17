import { ClassNames } from "@emotion/react";
import {
  HvBaseProps,
  HvButton,
  HvDialogTitle,
  HvGrid,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Report } from "@hitachivantara/uikit-react-icons";
import wizardTitleClasses, { HvWizardTitleClasses } from "./wizardTitleClasses";
import { styles } from "./WizardTitle.styles";
import { useContext, useEffect, useState } from "react";
import { HvStepProps } from "components/StepNavigation/DefaultNavigation";
import { HvStepNavigation, HvStepNavigationProps } from "components";
import HvWizardContext from "../WizardContext/WizardContext";

export interface HvWizardTitleProps extends HvBaseProps {
  /** Title for the wizard. */
  title?: string;
  /** Shows the summary button. */
  hasSummary?: boolean;
  /** An object containing all the labels for the wizard header. */
  labels?: {
    /** Summary button label. */
    summary?: string;
  };
  /** Custom object to define type, size and width of the StepNavigation component */
  customStep?: Pick<HvStepNavigationProps, "type" | "stepSize" | "width">;
  /** A Jss Object used to override or extend the styles applied to the empty state Wizard. */
  classes?: HvWizardTitleClasses;
}

const switchTabState = (state, currentTab, index) => {
  if (index === currentTab) return "Current";
  if (state.valid) return "Completed";
  if (state.valid === null) return "Enabled";
  if (state.touched && state.valid === false) return "Failed";
  // "Disabled"
  // "Pending"
  return "Enabled";
};

export const HvWizardTitle = ({
  title,
  hasSummary = false,
  labels = {},
  classes,
  customStep = {},
}: HvWizardTitleProps) => {
  const { context, summary, setSummary, tab, setTab } =
    useContext(HvWizardContext);

  const [steps, setSteps] = useState<HvStepProps[]>([]);

  useEffect(() => {
    if (summary === null && hasSummary) {
      setSummary(false);
    }

    return () => {
      setSummary(false);
    };
  }, []);

  useEffect(() => {
    const contextArray = Object.entries(context);

    if (contextArray.length) {
      const updatedSteps: HvStepProps[] = contextArray.map(
        ([, childState], index) => {
          return {
            title: childState?.name ?? `${index + 1}`,
            state: switchTabState(childState, tab, index),
            onClick: () => setTab(index),
          };
        }
      );

      setSteps(updatedSteps);
    }
  }, [context, tab, setTab]);

  const toggleSummary = () => {
    setSummary((oldSummary) => !oldSummary);
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvDialogTitle
          className={cx(
            wizardTitleClasses.headerContainer,
            css(styles.headerContainer),
            classes?.headerContainer
          )}
          classes={{
            messageContainer: cx(
              wizardTitleClasses.messageContainer,
              css(styles.messageContainer),
              classes?.messageContainer
            ),
          }}
        >
          <HvGrid
            container
            justifyContent="space-between"
            alignItems="center"
            className={cx(
              wizardTitleClasses.titleContainer,
              css(styles.titleContainer),
              classes?.titleContainer
            )}
          >
            {title && (
              <HvTypography variant="title3" component="h3">
                {title}
              </HvTypography>
            )}
            {!!steps.length && (
              <HvStepNavigation
                className={cx(
                  wizardTitleClasses.stepContainer,
                  css(styles.stepContainer),
                  classes?.stepContainer
                )}
                steps={steps}
                type={customStep?.type ?? "Default"}
                stepSize={customStep?.stepSize ?? "xs"}
                width={
                  customStep?.width ?? { xs: 200, sm: 350, md: 600, lg: 800 }
                }
              />
            )}
            {hasSummary && (
              <HvButton
                variant="secondarySubtle"
                className={cx(
                  wizardTitleClasses.buttonWidth,
                  css(styles.buttonWidth),
                  classes?.buttonWidth
                )}
                classes={{
                  root: cx(
                    wizardTitleClasses.rootSummaryButton,
                    css(styles.rootSummaryButton),
                    classes?.rootSummaryButton
                  ),
                }}
                onClick={toggleSummary}
                startIcon={<Report />}
              >
                {`${labels.summary ?? "Summary"}`}
              </HvButton>
            )}
          </HvGrid>
        </HvDialogTitle>
      )}
    </ClassNames>
  );
};
