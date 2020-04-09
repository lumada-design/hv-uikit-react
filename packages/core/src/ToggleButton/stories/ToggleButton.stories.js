import React, { useState } from "react";
import { Lock, Unlock } from "@hv/uikit-react-icons/dist";
import useTheme from "@material-ui/core/styles/useTheme";
import { HvToggleButton, HvButton } from "../..";

export default {
  title: "Components/Selectors/ToggleButton",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvToggleButton } from '@hv/uikit-react-core/dist'"
  },
  component: HvToggleButton
};

export const Main = () => {
  return (
    <HvToggleButton
      notSelectedIcon={Unlock}
      aria-label="Lock selection"
      notSelectedTitle="Open"
      selectedIcon={Lock}
      selectedTitle="Closed"
    />
  );
};

export const Controlled = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  const label = select ? "Selected" : "Not Selected";

  return (
    <>
      <HvButton style={{ marginBottom: "12px" }} onClick={toggleState}>
        {label}
      </HvButton>
      <div>
        <HvToggleButton
          selected={select}
          notSelectedIcon={Unlock}
          notSelectedTitle="Open"
          selectedIcon={Lock}
          selectedTitle="Closed"
          onClick={toggleState}
          aria-label="Lock selection"
        />
      </div>
    </>
  );
};

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with state."
    }
  }
};

export const Animated = () => {
  const Eye = props => {
    const { ...other } = props;
    const theme = useTheme();

    /* eslint-disable react/no-danger */
    return (
      <svg
        id="previewOff"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 14.71"
        height={30}
        width={30}
        {...other}
      >
        <defs>
          <style
            dangerouslySetInnerHTML={{
              __html: `.cls-1 { fill: none; } .cls-2 { fill: ${theme.hv.palette.accent.acce1}; } .default > rect{ fill: ${theme.hv.palette.accent.acce1} } .selected > rect{ fill: none; animation: dash_out .2s ease-in-out; } .notSelected > rect{ fill: ${theme.hv.palette.accent.acce1}; animation: dash_in .2s ease-in-out; } @keyframes dash_in { from { width: 0; } to { width: 19.8; } } @keyframes dash_out { from { width: 19.8; fill: ${theme.hv.palette.accent.acce1}; } to { width: 0; fill: ${theme.hv.palette.accent.acce1}; } }`
            }}
          />
        </defs>
        <g id="eye">
          <path
            id="fc623adc-be5e-469d-9072-f0580ca88767"
            className="cls-1"
            d="M8,2c4,0,8,6,8,6s-3.58,6-8,6S0,8,0,8,4,2,8,2Z"
            transform="translate(0 -0.65)"
          />
          <g id="a15f14a7-dffe-4c64-9428-aba4924f7fde">
            <path
              id="e12ad8e9-7d4f-4e83-ab6f-123ea22afc18"
              className="cls-2"
              d="M8,5a3,3,0,1,0,3,3A3,3,0,0,0,8,5Zm0,5a2,2,0,1,1,2-2A2,2,0,0,1,8,10Z"
              transform="translate(0 -0.65)"
            />
            <path
              id="a3bcdec7-1431-4292-be4a-511c1ac2729c"
              className="cls-2"
              d="M8,2C4,2,0,8,0,8s3.58,6,8,6,8-6,8-6S12,2,8,2Zm4.91,8.33C11.73,11.55,9.92,13,8,13s-3.75-1.47-4.94-2.69A17.83,17.83,0,0,1,1.21,8a22.36,22.36,0,0,1,2-2.35C5,3.93,6.64,3,8,3s3,.94,4.79,2.71a21.07,21.07,0,0,1,2,2.32A17.31,17.31,0,0,1,12.91,10.33Z"
              transform="translate(0 -0.65)"
            />
          </g>
        </g>
        <rect
          id="dash"
          x="-1.9"
          y="7.5"
          width="19.8"
          height={1}
          transform="translate(-3.31 7.36) rotate(-45)"
        />
      </svg>
    );
  };

  return (
    <HvToggleButton
      notSelectedIcon={Eye}
      notSelectedTitle="Don't Show"
      selectedTitle="Show"
      animated
    />
  );
};

Animated.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with a custom animated icon."
    }
  }
};
