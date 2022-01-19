import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { HvSwitch, HvBaseSwitch, HvLabel, HvInfoMessage } from "../..";
import Typography from "../../Typography";
import Button from "../../Button";
import HvGrid from "../../Grid";

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
    usage: 'import { HvSwitch } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
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
    description: { story: "Disabled switches." },
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
    description: { story: "Not editable switches." },
  },
};

export const Required = () => <HvSwitch required defaultChecked aria-label="Engine 1" />;

Required.parameters = {
  docs: {
    description: { story: "Required switch. Uncheck to show the error state." },
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

export const WithLabels = () => {
  const useStyles = makeStyles((theme) => ({
    controlContainer: {
      width: "100%",
      maxWidth: 400,
    },

    labelContainer: {
      display: "flex",
      alignItems: "flex-start",
    },
    label: {
      paddingBottom: "6px",
    },

    switchContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",

      "& > *": {
        marginLeft: theme.hv.spacing.xs,
      },
      "& > *:first-child": {
        marginLeft: 0,
      },
    },
  }));

  const classes = useStyles();

  const [deactivatedSwitch, setActivatedSwitch] = useState(false);
  const [state, setState] = useState(false);

  const SwitchLabel = ({ label }) => {
    const variant = deactivatedSwitch ? "placeholderText" : "normalText";
    const clickCallback = deactivatedSwitch ? undefined : () => setState(!state);
    const style = deactivatedSwitch ? undefined : { cursor: "pointer" };
    return (
      <Typography aria-hidden="true" variant={variant} style={style} onClick={clickCallback}>
        {label}
      </Typography>
    );
  };

  return (
    <div className={classes.controlContainer}>
      <div className={classes.labelContainer}>
        <HvLabel label="Toggle switch" htmlFor="engine-control-input" className={classes.label} />
        <HvInfoMessage id="engine-control-description">
          {deactivatedSwitch ? "Switch is inactive" : "Switch is active"}
        </HvInfoMessage>
      </div>
      <div className={classes.switchContainer}>
        <Button onClick={() => setActivatedSwitch((prev) => !prev)}>Toggle</Button>

        <SwitchLabel label="Off" />
        <HvSwitch
          id="engine-control"
          disabled={deactivatedSwitch}
          checked={state}
          aria-label="Engine Control"
          onChange={(_evt, newChecked) => setState(newChecked)}
        />
        <SwitchLabel label="On" />
      </div>
    </div>
  );
};

WithLabels.parameters = {
  docs: {
    description:
      "Sample showing usage of auxiliary labels to denote switch state. The labels can also be clicked to trigger the switch",
  },
};

export const ExternalErrorMessage = () => {
  const theme = useTheme();

  const [firstSwitchErrorMessage, setFirstSwitchErrorMessage] = useState(null);
  const [secondSwitchErrorMessage, setSecondSwitchErrorMessage] = useState(
    "No way for the second switch to be valid!"
  );

  return (
    <HvGrid container>
      <HvGrid item xs={5} container>
        <HvGrid item xs={12}>
          <HvSwitch
            required
            defaultChecked
            aria-errormessage="firstSwitch-error"
            onChange={(_e, checked) => {
              if (checked) {
                setFirstSwitchErrorMessage(null);
              } else if (!checked) {
                setFirstSwitchErrorMessage("You must turn on the first switch");
              }
            }}
            label="First Switch"
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvSwitch
            status="invalid"
            aria-errormessage="secondSwitch-error"
            onChange={() => {
              setSecondSwitchErrorMessage("No way for the second switch to be valid! I told you!");
            }}
            label="Second Switch"
          />
        </HvGrid>
      </HvGrid>
      <HvGrid
        item
        xs={7}
        style={{
          backgroundColor: theme.hv.palette.semantic.sema9,
          color: theme.hv.palette.base.base2,
        }}
      >
        <h4>Form errors:</h4>
        <ul>
          {firstSwitchErrorMessage && (
            <li id="firstSwitch-error" aria-live="polite">
              {firstSwitchErrorMessage}
            </li>
          )}
          {secondSwitchErrorMessage && (
            <li id="secondSwitch-error" aria-live="polite">
              {secondSwitchErrorMessage}
            </li>
          )}
        </ul>
      </HvGrid>
    </HvGrid>
  );
};

ExternalErrorMessage.parameters = {
  docs: {
    description: {
      story:
        "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
    },
  },
};
