import { Dispatch, SetStateAction } from "react";
import { hexToRgbA, useTheme } from "@hitachivantara/uikit-react-core";

import { Step } from "./Step";
import classes from "./tutorialStyles";

export const Tutorial = ({
  setTutorialOpen,
  currentStep,
  setCurrentStep,
}: {
  setTutorialOpen: Dispatch<SetStateAction<boolean>> | undefined;
  currentStep: number | undefined;
  setCurrentStep: Dispatch<SetStateAction<number>> | undefined;
}) => {
  const { activeTheme, selectedMode } = useTheme();

  const nextHandler = (close = false) => {
    if (close) {
      setTutorialOpen?.(false);
      setCurrentStep?.(1);
    } else {
      setCurrentStep?.((prev) => prev + 1);
    }
  };

  const previousHandler = () => {
    setCurrentStep?.((prev) => prev - 1);
  };

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: hexToRgbA(
          activeTheme?.colors.modes[selectedMode].base_dark,
          0.5
        ),
      }}
    >
      <Step
        idx={currentStep}
        previousHandler={previousHandler}
        nextHandler={nextHandler}
        setTutorialOpen={setTutorialOpen}
      />
    </div>
  );
};
