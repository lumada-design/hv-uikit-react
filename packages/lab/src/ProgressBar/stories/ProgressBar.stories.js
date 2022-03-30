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
const ProgressBarSimulator = ({ inc, error, undeterminate, ariaLabel, ariaLive }) => {
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
    }, 500);
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
        status={status}
        undeterminate={undeterminate}
        ariaProps={{
          "aria-label": ariaLabel,
          "aria-busy": false,
          "aria-live": ariaLive,
        }}
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
          ariaLabel="Underterminate Progress Bar"
          ariaLive="polite"
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
          ariaLabel="Determinate Progress Bar"
          ariaLive="assertive"
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
          ariaLabel="Determinate Progress Bar"
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
        <HvProgressBar
          value={100}
          status="completed"
          ariaProps={{
            "aria-label": "Example Determined Progress Bar",
            // "aria-busy":run,
            "aria-live": "polite",
          }}
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
        <HvTypography variant="highlightText">Loading</HvTypography>
        <HvProgressBar
          value={40}
          ariaProps={{
            "aria-label": "Example Determined Loading Progress Bar",
            // "aria-busy":run,
            "aria-live": "polite",
          }}
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
        <HvProgressBar
          value={30}
          status="error"
          ariaProps={{
            "aria-label": "Example Determined Error Progress Bar",
            // "aria-busy":run,
            "aria-live": "polite",
          }}
        />
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
        <HvTypography style={{ marginBottom: 14 }} variant="highlightText">
          Success
        </HvTypography>
        <HvProgressBar
          status="completed"
          value={100}
          undeterminate
          ariaProps={{
            "aria-label": "Example Undetermined Completed Progress Bar",
            // "aria-busy":run,
            "aria-live": "polite",
          }}
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
        <HvTypography style={{ marginBottom: 14 }} variant="highlightText">
          Loading
        </HvTypography>
        <HvProgressBar
          value={40}
          undeterminate
          ariaProps={{
            "aria-label": "Example Undetermined Loading Progress Bar",
            // "aria-busy":run,
            "aria-live": "polite",
          }}
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
        <HvTypography style={{ marginBottom: 14 }} variant="highlightText">
          Error
        </HvTypography>
        <HvProgressBar
          value={30}
          undeterminate
          status="error"
          ariaProps={{
            "aria-label": "Example Undetermined Error Progress Bar",
            // "aria-busy":run,
            "aria-live": "polite",
          }}
        />
      </div>
    </div>
  );
};

Undeterminate.parameters = {
  docs: {},
};
