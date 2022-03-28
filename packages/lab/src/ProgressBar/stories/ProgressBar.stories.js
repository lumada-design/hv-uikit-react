import React, { useEffect, useState } from "react";

import { HvButton, HvTypography } from "@hitachivantara/uikit-react-core";

import { HvProgressBar } from "../..";

export default {
  title: "Lab/ProgressBar",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvProgressBar } from '@hitachivantara/uikit-react-lab'",
  },
  component: HvProgressBar,
};
const ProgressBarSimulator = ({ inc, error, undeterminate, arialabel }) => {
  const [value, setValue] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value === 100 || (error && value === error)) {
        clearInterval(interval);
      } else if (run) setValue(inc);
    }, 500);
    return () => clearInterval(interval);
  }, [inc, value, run, error]);

  const reset = () => {
    setValue(0);
    setRun(false);
  };

  const start = () => {
    setRun(true);
  };

  return (
    <div style={{ width: 400 }}>
      <HvProgressBar
        value={value}
        error={value === error}
        undeterminate={undeterminate}
        aria-label={arialabel}
      />
      <div>
        <HvButton onClick={start}>Start</HvButton>
        <HvButton style={{ marginLeft: 10 }} onClick={reset}>
          Reset
        </HvButton>
      </div>
    </div>
  );
};

export const Main = () => {
  return (
    <div
      style={{
        display: "flex:",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <HvTypography style={{ marginBottom: 15 }} variant="highlightText">
          Success Underterminate
        </HvTypography>
        <ProgressBarSimulator
          label={(v) => `${v}%`}
          inc={(v) => v + 5}
          undeterminate
          arialabel="Underterminate Progress Bar"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <HvTypography variant="highlightText">Success</HvTypography>
        <ProgressBarSimulator
          label={(v) => `${v}%`}
          inc={(v) => v + 10}
          arialabel="Determinate Progress Bar"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
        }}
      >
        <HvTypography variant="highlightText">Error</HvTypography>
        <ProgressBarSimulator
          label={(v) => `${v}%`}
          inc={(v) => v + 5}
          error={30}
          arialabel="Determinate Progress Bar"
        />
      </div>
    </div>
  );
};

export const Determined = () => {
  return (
    <div
      style={{
        display: "flex:",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <HvTypography variant="highlightText">Success</HvTypography>
        <HvProgressBar value={100} aria-label="Example Determined Progress Bar" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <HvTypography variant="highlightText">Loading</HvTypography>
        <HvProgressBar value={40} aria-label="Example Determined Progress Bar" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
        }}
      >
        <HvTypography variant="highlightText">Error</HvTypography>
        <HvProgressBar value={30} error={30} aria-label="Example Determined Error Progress Bar" />
      </div>
    </div>
  );
};

Determined.parameters = {
  docs: {},
};

export const Undeterminate = () => {
  return (
    <div
      style={{
        display: "flex:",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <HvTypography style={{ marginBottom: 15 }} variant="highlightText">
          Success
        </HvTypography>
        <HvProgressBar value={100} undeterminate aria-label="Example undeterminate Progress Bar" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <HvTypography style={{ marginBottom: 15 }} variant="highlightText">
          Loading
        </HvTypography>
        <HvProgressBar value={40} undeterminate aria-label="Example undeterminate Progress Bar" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 400,
          margin: "auto",
        }}
      >
        <HvTypography style={{ marginBottom: 15 }} variant="highlightText">
          Error
        </HvTypography>
        <HvProgressBar
          value={30}
          undeterminate
          error={30}
          aria-label="Example undeterminate Progress Bar Error"
        />
      </div>
    </div>
  );
};

Undeterminate.parameters = {
  docs: {},
};
