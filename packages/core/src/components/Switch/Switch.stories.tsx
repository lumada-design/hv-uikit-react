import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvBaseSwitch,
  HvButton,
  HvGrid,
  HvInfoMessage,
  HvLabel,
  HvTypography,
} from "components";
import { HvSwitch, HvSwitchProps } from "./Switch";

const StyledDecorator = styled("div")({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  "& > *": {
    margin: "0 10px 5px 0",
  },
});

const meta: Meta<typeof HvSwitch> = {
  title: "Inputs/Switch",
  component: HvSwitch,
  subcomponents: { HvBaseSwitch },
  decorators: [
    (Story) => (
      <StyledDecorator>
        <Story />
      </StyledDecorator>
    ),
  ],
};

export default meta;

export const Main: StoryObj<HvSwitchProps> = {
  args: {
    value: "on",
    label: "",
    required: false,
    readOnly: false,
    disabled: false,
    checked: false,
    defaultChecked: false,
  },
  render: ({
    value,
    label,
    required,
    readOnly,
    disabled,
    checked,
    defaultChecked,
  }) => {
    return (
      <HvSwitch
        value={value}
        label={label}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
      />
    );
  },
};

export const Disabled: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: { story: "Disabled switches." },
    },
  },
  render: () => {
    return (
      <>
        <HvSwitch disabled aria-label="Engine 1" />
        <HvSwitch defaultChecked disabled aria-label="Engine 2" />
      </>
    );
  },
};

export const ReadOnly: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: { story: "Not editable switches." },
    },
  },
  render: () => {
    return (
      <>
        <HvSwitch readOnly aria-label="Engine 1" />
        <HvSwitch defaultChecked readOnly aria-label="Engine 2" />
      </>
    );
  },
};

export const Required: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: {
        story: "Required switch. Uncheck to show the error state.",
      },
    },
  },
  render: () => {
    return <HvSwitch required defaultChecked aria-label="Engine 1" />;
  },
};

const StyledTypography = styled(HvTypography)(
  ({ state }: { state: boolean }) => ({
    color: state ? theme.colors.sema1 : theme.colors.sema14,
  })
);

export const Controlled: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: { story: "Controlled Switch." },
    },
  },
  render: () => {
    const [state, setState] = useState<boolean>(false);

    const StateString = ({ stateProp }) => {
      return (
        <StyledTypography state={stateProp}>
          {`The switch is ${state ? "On" : "Off"}`}
        </StyledTypography>
      );
    };

    return (
      <>
        <HvButton onClick={() => setState((prev) => !prev)}>Toggle</HvButton>
        <p />
        <HvSwitch
          checked={state}
          aria-label="Engine Control"
          onChange={(_evt, newChecked) => setState(newChecked)}
        />
        <p />
        <StateString stateProp={state} />
      </>
    );
  },
};

const StyledControlContainer = styled("div")({
  width: "100%",
  maxWidth: 400,
});

const StyledLabelContainer = styled("div")({
  display: "flex",
  alignItems: "flex-start",
});

const StyledLabel = styled(HvLabel)({
  paddingBottom: "6px",
});

const StyledSwitchContainer = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "center",

  "& > *": {
    marginLeft: theme.space.xs,
  },
  "& > *:first-child": {
    marginLeft: 0,
  },
});

export const WithLabels: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Sample showing usage of auxiliary labels to denote switch state. The labels can also be clicked to trigger the switch",
      },
    },
  },
  render: () => {
    const [deactivatedSwitch, setActivatedSwitch] = useState(false);
    const [state, setState] = useState(false);

    const SwitchLabel = ({ label }) => {
      const clickCallback = deactivatedSwitch
        ? undefined
        : () => setState(!state);
      const style = deactivatedSwitch ? undefined : { cursor: "pointer" };
      return (
        <HvTypography aria-hidden="true" style={style} onClick={clickCallback}>
          {label}
        </HvTypography>
      );
    };

    return (
      <StyledControlContainer>
        <StyledLabelContainer>
          <StyledLabel label="Toggle switch" htmlFor="engine-control-input" />
          <HvInfoMessage id="engine-control-description">
            {deactivatedSwitch ? "Switch is inactive" : "Switch is active"}
          </HvInfoMessage>
        </StyledLabelContainer>
        <StyledSwitchContainer>
          <HvButton onClick={() => setActivatedSwitch((prev) => !prev)}>
            Toggle
          </HvButton>

          <SwitchLabel label="Off" />
          <HvSwitch
            id="engine-control"
            disabled={deactivatedSwitch}
            checked={state}
            aria-label="Engine Control"
            onChange={(_evt, newChecked) => setState(newChecked)}
          />
          <SwitchLabel label="On" />
        </StyledSwitchContainer>
      </StyledControlContainer>
    );
  },
};

export const ExternalErrorMessage: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is responsibility of the app.",
      },
    },
  },
  render: () => {
    const [firstSwitchErrorMessage, setFirstSwitchErrorMessage] = useState<
      string | null
    >(null);
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
                  setFirstSwitchErrorMessage(
                    "You must turn on the first switch"
                  );
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
                setSecondSwitchErrorMessage(
                  "No way for the second switch to be valid! I told you!"
                );
              }}
              label="Second Switch"
            />
          </HvGrid>
        </HvGrid>
        <HvGrid
          item
          xs={7}
          style={{
            backgroundColor: theme.colors.sema9,
            color: theme.colors.base2,
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
  },
};
