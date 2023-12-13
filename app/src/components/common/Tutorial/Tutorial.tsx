import { Dispatch, SetStateAction } from "react";
import { theme } from "@hitachivantara/uikit-react-core";

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
        backgroundColor: theme.alpha("base_dark", 0.5),
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
