import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { HvSwitch } from "../..";
import Typography from "../../Typography";
import Button from "../../Button";

export default {
  title: "Components/Selectors/Switch",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvSwitch } from "@hitachivantara/uikit-react-core";',
  },
  component: HvSwitch,
};

export const Main = () => {
  return <HvSwitch />;
};

export const OnChange = () => {
  const [state, setState] = useState(false);

  const useStyles = makeStyles((theme) => ({
    on: {
      color: theme.hv.palette.semantic.sema1,
    },
    off: {
      color: theme.hv.palette.semantic.sema14,
    },
  }));

  const StateString = () => {
    const classes = useStyles();
    return (
      <Typography className={clsx({ [classes.on]: state, [classes.off]: !state })}>
        {`The switch is ${state ? "On" : "Off"}`}
      </Typography>
    );
  };

  return (
    <>
      <HvSwitch
        checked={state}
        id="Switch-no-labels"
        aria-label="Engine Control"
        displayIconChecked
        onChange={() => setState(!state)}
      />
      <p />
      <StateString state={state} />
    </>
  );
};

OnChange.story = {
  parameters: {
    docs: {
      storyDescription: "OnChange is called in the labels as in the switch itself.",
    },
  },
};

export const NoLabels = () => (
  <HvSwitch
    checked
    id="Switch-no-labels"
    showLabels={false}
    aria-label="Engine Control"
    displayIconChecked
  />
);

export const LabelsDefinition = () => {
  const labels = {
    left: "Disconnect",
    right: "Connect",
  };

  return <HvSwitch checked={false} labels={labels} aria-label="Server online" />;
};

export const Disabled = () => <HvSwitch disabled />;

export const Controlled = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Button onClick={() => setChecked((prev) => !prev)}>Toggle</Button>
      <p />
      <HvSwitch checked={checked} />
    </>
  );
};
