import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { HvSwitch, HvBaseSwitch } from "../..";
import Typography from "../../Typography";
import Button from "../../Button";

// eslint-disable-next-line react/prop-types
const FlexDecorator = ({ children }) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
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
  title: "Forms/Switch",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvSwitch } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.3.0",
  },
  component: HvSwitch,
  subcomponents: { HvBaseSwitch },
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
    <HvSwitch aria-label="Engine 1" />
    <HvSwitch defaultChecked aria-label="Engine 2" />
  </>
);

export const Disabled = () => (
  <>
    <HvSwitch disabled aria-label="Engine 1" />
    <HvSwitch defaultChecked disabled aria-label="Engine 2" />
  </>
);

Disabled.parameters = {
  docs: {
    description: "Disabled switches.",
  },
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast",
    ],
  },
};

export const ReadOnly = () => (
  <>
    <HvSwitch readOnly aria-label="Engine 1" />
    <HvSwitch defaultChecked readOnly aria-label="Engine 2" />
  </>
);

ReadOnly.parameters = {
  docs: {
    description: "Not editable switches.",
  },
};

export const Required = () => (
  <>
    <HvSwitch required defaultChecked aria-label="Engine 1" />
  </>
);

Required.parameters = {
  docs: {
    description: "Required switch. Uncheck to show the error state.",
  },
};

export const Controlled = () => {
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
      <Button onClick={() => setState((prev) => !prev)}>Toggle</Button>
      <p />
      <HvSwitch
        checked={state}
        aria-label="Engine Control"
        onChange={(_evt, newChecked) => setState(newChecked)}
      />
      <p />
      <StateString state={state} />
    </>
  );
};
