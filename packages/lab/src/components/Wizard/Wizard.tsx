import { HvBaseProps } from "@hitachivantara/uikit-react-core";
import { HvStepNavigationProps } from "..";
import { HvWizardClasses } from "./wizardClasses";
import { ModalProps } from "@mui/material";
import React, { useCallback } from "react";
import { HvWizardContainer } from "./WizardContainer/WizardContainer";
import { HvWizardTitle, HvWizardTitleProps } from "./WizardTitle/WizardTitle";
import { HvWizardContent } from "./WizardContent/WizardContent";
import { HvWizardActions } from "./index";
import WizardProvider, {
  HvWizardTabs,
  HvWizardTab,
} from "./WizardContext/WizardContext";
import { HvWizardActionsProps } from "./WizardActions/WizardActions";

export interface HvWizardProps extends HvBaseProps {
  /** Current state of the Wizard. */
  open: boolean;
  /** Function executed on close. */
  onClose: ModalProps["onClose"];
  /** Function executed on submit. */
  handleSubmit: (context: HvWizardTabs<HvWizardTab>) => void;
  /** Title for the wizard. */
  title?: string;
  /** An object containing all the labels for the wizard. */
  labels?: HvWizardActionsProps["labels"] & HvWizardTitleProps["labels"];
  /** Shows the summary button. */
  hasSummary?: boolean;
  /** The content of the summary. */
  summaryContent?: React.ReactNode;
  /** Enables the skip button. */
  skippable?: boolean;
  /** Forces minimum height to the component. */
  fixedHeight?: boolean;
  /** Whether the loading animation is shown. */
  loading?: boolean;
  /** Custom object to define type, size and width of the StepNavigation component */
  customStep?: Pick<HvStepNavigationProps, "type" | "stepSize" | "width">;
  /** A Jss Object used to override or extend the styles applied to the empty state Wizard. */
  classes?: HvWizardClasses;
}

export const HvWizard = ({
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
}: HvWizardProps) => {
  const handleClose = useCallback(
    (evt, reason) => {
      if (reason !== "backdropClick") {
        onClose?.(evt, reason);
      }
    },
    [onClose]
  );

  return (
    <WizardProvider>
      <HvWizardContainer
        className={className}
        handleClose={handleClose}
        open={open}
        {...others}
      >
        <HvWizardTitle
          title={title}
          hasSummary={hasSummary}
          labels={labels}
          customStep={customStep}
        />
        <HvWizardContent
          loading={loading}
          fixedHeight={fixedHeight}
          summaryContent={summaryContent}
        >
          {children}
        </HvWizardContent>
        <HvWizardActions
          loading={loading}
          skippable={skippable}
          labels={labels}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </HvWizardContainer>
    </WizardProvider>
  );
};
