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
import { tutorialData } from "./tutorialData";
import classes from "./tutorialStyles";

export const Step = ({
  idx,
  previousHandler,
  nextHandler,
  setTutorialOpen,
}) => {
  const { setOpen } = useContext(GeneratorContext);

  useEffect(() => {
    if (idx === 1) {
      setOpen?.(false);
    } else if (idx === 2) {
      setOpen?.(true);
    }
  }, [idx]);

  const stepData = tutorialData[idx - 1];
  const isLastStep = idx === tutorialData.length;

  return (
    <>
      <HvDialog
        open
        firstFocusable="next"
        disableBackdropClick
        classes={{
          background: css({
            display: "none",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }),
          paper: css({
            position: "absolute",
            overflow: "unset",
            margin: 0,
            ...stepData.position,
            ...stepData.size,
          }),
        }}
        onClose={() => setTutorialOpen(false)}
      >
        <HvDialogTitle>
          <HvTypography variant="title3">{stepData.title}</HvTypography>
        </HvDialogTitle>
        <HvDialogContent>
          <div
            className={classes[`triangle_${stepData.orientation || "up"}`]}
            style={{ ...stepData.arrow }}
          ></div>
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
    </>
  );
};
