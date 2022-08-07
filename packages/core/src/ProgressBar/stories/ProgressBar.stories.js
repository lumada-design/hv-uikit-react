import React from "react";

import { HvTypography } from "@hitachivantara/uikit-react-core";

import HvProgressBar from "..";

import { ProgressBarSimulator } from "../ProgressBarSimulator";

export default {
  title: "Feedback/Progress Bar",
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
