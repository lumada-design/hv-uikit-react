import { clsx } from "clsx";
import { css } from "@emotion/css";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { GeneratorContext } from "generator/GeneratorContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tutorialData } from "./tutorialData";
import classes from "./tutorialStyles";

export const Step = ({
  idx,
  previousHandler,
  nextHandler,
  setTutorialOpen,
}) => {
  const { setOpen, setCurrentStep } = useContext(GeneratorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (idx === 1) {
      setOpen?.(false);
    } else if (idx === 2) {
      setOpen?.(true);
    } else if (idx === 6) {
      navigate("/preview/list-view");
    } else if (idx === 8) {
      navigate("/components");
    }
  }, [idx, navigate, setOpen]);

  const onCloseHandler = () => {
    setTutorialOpen(false);
    setCurrentStep?.(1);
  };

  const stepData = tutorialData[idx - 1];
  const isLastStep = idx === tutorialData.length;

  return (
    <HvDialog
      open
      firstFocusable="next"
      disableBackdropClick
      classes={{
        background: css({
          display: "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }),
        paper: clsx(
          css({
            ...stepData.position,
            ...stepData.size,
          }),
          classes.paper
        ),
      }}
      onClose={onCloseHandler}
    >
      <HvDialogTitle>
        <HvTypography variant="title3">{stepData.title}</HvTypography>
      </HvDialogTitle>
      <HvDialogContent>
        <div
          className={classes[`triangle_${stepData.orientation || "up"}`]}
          style={{ ...stepData.arrow }}
        />
        {stepData.content}
      </HvDialogContent>
      <HvDialogActions>
        {!isLastStep && (
          <HvButton
            id="previous"
            variant="secondaryGhost"
            onClick={previousHandler}
            disabled={idx === 1}
          >
            PREVIOUS
          </HvButton>
        )}
        <HvButton
          id="next"
          variant="secondaryGhost"
          onClick={() => nextHandler(isLastStep)}
        >
          {isLastStep ? "END TUTORIAL" : "NEXT"}
        </HvButton>
      </HvDialogActions>
    </HvDialog>
  );
};
