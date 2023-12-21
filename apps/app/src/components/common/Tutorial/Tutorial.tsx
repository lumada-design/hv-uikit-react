import { Dispatch, SetStateAction } from "react";

import { Step } from "./Step";

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
    <div className="screen overflow-hidden position-fixed inset-0 z-modal bg-base_dark:50">
      <Step
        idx={currentStep}
        previousHandler={previousHandler}
        nextHandler={nextHandler}
        setTutorialOpen={setTutorialOpen}
      />
    </div>
  );
};
