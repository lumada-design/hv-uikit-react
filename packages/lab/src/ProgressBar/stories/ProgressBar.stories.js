import React from "react";

import { HvTypography } from "@hitachivantara/uikit-react-core";

import { HvProgressBar } from "../..";

import { ProgressBarSimulator } from "../ProgressBarSimulator";

export default {
  title: "Lab/Progress Bar",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvProgressBar } from '@hitachivantara/uikit-react-lab'",
  },
  component: HvProgressBar,
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
          labelProps={{
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
          labelProps={{
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
          labelProps={{
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
          labelProps={{
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
          labelProps={{
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
          labelProps={{
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
