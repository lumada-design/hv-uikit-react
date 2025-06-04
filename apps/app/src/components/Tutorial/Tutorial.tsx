import { useEffect } from "react";
import { useNavigate } from "react-router";
import { css } from "@emotion/css";
import { clsx } from "clsx";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { useGeneratorContext } from "../../generator/GeneratorContext";
import { tutorialData } from "./tutorialData";
import classes from "./tutorialStyles";

export const Tutorial = () => {
  const {
    setOpen,
    setTutorialOpen,
    currentStep: idx,
    setCurrentStep,
  } = useGeneratorContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (idx === 1) {
      setOpen?.(false);
    } else if (idx === 2) {
      setOpen?.(true);
    } else if (idx === 6) {
      navigate("/templates/list-view");
    } else if (idx === 8) {
      navigate("/components");
    }
  }, [idx, navigate, setOpen]);

  const onCloseHandler = () => {
    setTutorialOpen?.(false);
    setCurrentStep?.(1);
  };

  const stepData = idx ? tutorialData[idx - 1] : undefined;
  const isLastStep = idx === tutorialData.length;

  return (
    <HvDialog
      open
      disableBackdropClick
      classes={{
        paper: clsx(
          css({
            ...stepData?.position,
            ...stepData?.size,
          }),
          classes.paper,
        ),
      }}
      onClose={onCloseHandler}
    >
      <div
        className={classes[`triangle_${stepData?.orientation || "up"}`]}
        style={{ ...stepData?.arrow }}
      />
      <HvDialogTitle>
        <HvTypography variant="title3">{stepData?.title}</HvTypography>
      </HvDialogTitle>
      <HvDialogContent>{stepData?.content}</HvDialogContent>
      <HvDialogActions>
        {!isLastStep && (
          <HvButton
            variant="secondaryGhost"
            onClick={() => setCurrentStep?.((prev) => prev - 1)}
            disabled={idx === 1}
          >
            PREVIOUS
          </HvButton>
        )}
        <HvButton
          autoFocus
          variant="secondaryGhost"
          onClick={() => {
            if (isLastStep) {
              setTutorialOpen?.(false);
              setCurrentStep?.(1);
            } else {
              setCurrentStep?.((prev) => prev + 1);
            }
          }}
        >
          {isLastStep ? "END TUTORIAL" : "NEXT"}
        </HvButton>
      </HvDialogActions>
    </HvDialog>
  );
};
