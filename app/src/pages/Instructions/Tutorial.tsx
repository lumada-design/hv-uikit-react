import { hexToRgbA, useTheme } from "@hitachivantara/uikit-react-core";
import { useState } from "react";
import { Step } from "./Step";
import classes from "./tutorialStyles";

export const Tutorial = ({ setTutorialOpen, currentStep, setCurrentStep }) => {
  const { activeTheme, selectedMode } = useTheme();
  // const [step, setStep] = useState<number>(1);

  const nextHandler = (close = false) => {
    if (close) {
      setTutorialOpen(false);
      setCurrentStep(1);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousHandler = () => {
    setCurrentStep((prev) => prev - 1);
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
