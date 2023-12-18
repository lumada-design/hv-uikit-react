import { AriaAttributes, useEffect, useState } from "react";

import { HvButton } from "../Button";

import { HvProgressBar, HvProgressBarStatus } from "./ProgressBar";

export const ProgressBarSimulator = ({
  inc,
  error,
  ariaLabel,
}: {
  inc: (v: number) => number;
  error?: number;
  ariaLabel?: AriaAttributes["aria-label"];
  ariaLive?: AriaAttributes["aria-live"];
}) => {
  const [status, setStatus] = useState("inProgress");
  const [value, setValue] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value === 100) {
        setRun(false);
        clearInterval(interval);
        setStatus("completed");
      } else if (error && value === error) {
        clearInterval(interval);
        setStatus("error");
      } else if (run) setValue(inc);
    }, 150);
    return () => clearInterval(interval);
  }, [inc, value, run, error]);

  const reset = () => {
    setValue(0);
    setStatus("inProgress");
  };

  const start = () => {
    setRun(true);
  };

  return (
    <div style={{ width: 400 }}>
      <HvProgressBar
        value={value}
        status={status as HvProgressBarStatus}
        aria-label={ariaLabel}
        aria-busy={status === "inProgress"}
      />
      <div style={{ marginTop: 10 }}>
        <HvButton onClick={start}>Start</HvButton>
        <HvButton style={{ marginLeft: 10 }} onClick={reset}>
          Reset
        </HvButton>
      </div>
    </div>
  );
};
