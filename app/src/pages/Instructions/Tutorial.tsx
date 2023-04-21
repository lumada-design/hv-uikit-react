import { hexToRgbA, useTheme } from "@hitachivantara/uikit-react-core";
import { useState } from "react";
import { Step } from "./Step";
import classes from "./tutorialStyles";

export const Tutorial = ({ setTutorialOpen }) => {
  const { activeTheme, selectedMode } = useTheme();
  const [step, setStep] = useState<number>(1);

  const nextHandler = (close = false) => {
    if (close) {
      setTutorialOpen(false);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const previousHandler = () => {
    setStep((prev) => prev - 1);
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
        idx={step}
        previousHandler={previousHandler}
        nextHandler={nextHandler}
        setTutorialOpen={setTutorialOpen}
      />
    </div>
  );
};
