import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

import { useGeneratorContext } from "~/generator/GeneratorContext";

import { tutorialData } from "./tutorialData";
import classes from "./tutorialStyles";

export const Step = ({
  idx,
  previousHandler,
  nextHandler,
  setTutorialOpen,
}: {
  idx: number | undefined;
  previousHandler: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  nextHandler: (value: boolean) => void;
  setTutorialOpen: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
  const { setOpen, setCurrentStep } = useGeneratorContext();
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
      firstFocusable="next"
      disableBackdropClick
      classes={{
        background: "hidden bg-black:50",
        paper: clsx(
          css({
            ...stepData?.position,
            ...stepData?.size,
          }),
          classes.paper
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
