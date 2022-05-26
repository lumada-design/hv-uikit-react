import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Favorite,
  FavoriteSelected,
  BackwardsEmpty,
  BackwardsSelected,
  UpEmpty,
  UpSelected,
  DownEmpty,
  DownSelected,
  ForwardsEmpty,
  ForwardsSelected,
  Like,
  LikeSelected,
  Dislike,
  DislikeSelected,
  LightOff,
  LightOn,
  Unlock,
  Lock,
} from "@hitachivantara/uikit-react-icons";
import Eye from "./Eye";

import { HvToggleButton, HvTooltip, HvTypography } from "../..";

// eslint-disable-next-line react/prop-types
const FlexDecorator = ({ children }) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "end",
      flexWrap: "wrap",
      "& > *": {
        margin: "0 10px 5px 0",
      },
    },
  });

  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default {
  title: "Components/Inputs/Toggle Button",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvToggleButton } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvToggleButton,
  decorators: [
    (Story) => (
      <FlexDecorator>
        <Story />
      </FlexDecorator>
    ),
  ],
};

export const Main = () => (
  <>
    <HvToggleButton
      defaultSelected
      aria-label="Favorite"
      notSelectedIcon={<Favorite />}
      selectedIcon={<FavoriteSelected />}
    />
    <HvToggleButton
      aria-label="Backwards"
      notSelectedIcon={<BackwardsEmpty />}
      selectedIcon={<BackwardsSelected />}
    />
    <HvToggleButton aria-label="Up" notSelectedIcon={<UpEmpty />} selectedIcon={<UpSelected />} />
    <HvToggleButton
      disabled
      aria-label="Down"
      notSelectedIcon={<DownEmpty />}
      selectedIcon={<DownSelected />}
    />
    <HvToggleButton
      aria-label="Forward"
      notSelectedIcon={<ForwardsEmpty />}
      selectedIcon={<ForwardsSelected />}
    />
    <HvToggleButton aria-label="Like" notSelectedIcon={<Like />} selectedIcon={<LikeSelected />} />
    <HvToggleButton
      aria-label="Dislike"
      notSelectedIcon={<Dislike />}
      selectedIcon={<DislikeSelected />}
    />
    <HvToggleButton aria-label="Light" notSelectedIcon={<LightOff />} selectedIcon={<LightOn />} />
    <HvToggleButton aria-label="Lock" notSelectedIcon={<Unlock />} selectedIcon={<Lock />} />
  </>
);

export const Disabled = () => (
  <HvTooltip title={<HvTypography>Can not turn the light on</HvTypography>}>
    <HvToggleButton disabled aria-label="Light">
      <LightOff />
    </HvToggleButton>
  </HvTooltip>
);

Disabled.parameters = {
  docs: {
    description: {
      story:
        "A sample showcasing a disabled toggle button combined with a tooltip. There is a known limitation with the Button Forward ref, but adding a div around the Tooltip fixes it temporarily.",
    },
  },
};

export const Tooltip = () => {
  const [selected, setSelected] = useState(false);

  const tooltip = <HvTypography>{selected ? "Turn off" : "Turn on"}</HvTypography>;

  return (
    <HvTooltip title={tooltip}>
      <HvToggleButton aria-label="Light" onClick={() => setSelected(!selected)}>
        {selected ? <LightOn /> : <LightOff />}
      </HvToggleButton>
    </HvTooltip>
  );
};

Tooltip.parameters = {
  docs: {
    description:
      "A sample showcasing a tooltip changing its content combined with the toggle button. The same Tooltip Forward Ref combination with Button known limitation as the previous sample is applied here.",
  },
};

export const Animated = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  return (
    <HvToggleButton selected={select} onClick={toggleState} aria-label="Eye">
      <Eye className={select ? "selected" : "notSelected"} />
    </HvToggleButton>
  );
};

Animated.parameters = {
  docs: {
    description: { story: "A sample showcasing a toggle button with a custom animated icon." },
  },
};
