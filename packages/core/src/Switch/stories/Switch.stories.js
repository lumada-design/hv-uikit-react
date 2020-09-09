import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { HvSwitch } from "../..";
import Typography from "../../Typography";
import Button from "../../Button";

export default {
  title: "Patterns/Selectors/Switch",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvSwitch } from '@hv/uikit-react-core/dist'"
  },
  component: HvSwitch
};

export const Main = () => (
  <HvSwitch checked id="Switch-no-labels" showLabels={false} aria-label="Engine Control" />
);

Main.parameters = {
  v3: true
};

export const OnChange = () => {
  const [state, setState] = useState(false);

  const useStyles = makeStyles(theme => ({
    on: {
      color: theme.hv.palette.semantic.sema1
    },
    off: {
      color: theme.hv.palette.semantic.sema14
    }
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
        onChange={() => setState(!state)}
      />
      <p />
      <StateString state={state} />
    </>
  );
};

OnChange.parameters = {
  docs: {
    description: { story: "OnChange is called in the labels as in the switch itself." }
  },
  v3: true
};

export const WithLabels = () => <HvSwitch />;

WithLabels.parameters = {
  v3: true
};

export const LabelsDefinition = () => {
  const labels = {
    left: "Disconnect",
    right: "Connect"
  };

  return <HvSwitch checked={false} labels={labels} aria-label="Server online" />;
};

LabelsDefinition.parameters = {
  v3: true
};

export const Disabled = () => <HvSwitch disabled />;

Disabled.parameters = {
  v3: true
};

export const Controlled = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Button onClick={() => setChecked(prev => !prev)}>Toggle</Button>
      <p />
      <HvSwitch checked={checked} />
    </>
  );
};

Controlled.parameters = {
  v3: true
};
