import React, { useState } from "react";
import { HvWarningText, HvButton, HvFormElement } from "../../..";

export default {
  title: "Components/Forms/Warning Text",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvWarningText } from '@hv/uikit-react-core/dist'",
    v3: true
  },
  component: HvWarningText,
  decorators: [storyFn => <div style={{ width: "300px" }}>{storyFn()}</div>]
};

export const Main = () => (
  <HvWarningText id="warningText" isVisible>
    Invalid message here
  </HvWarningText>
);

export const WarningTextWithStatus = () => {
  const [formStatus, setFormStatus] = useState("invalid");
  const btnStyle = { margin: "10px" };

  return (
    <HvFormElement status={formStatus}>
      <HvWarningText id="warningText-notify">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been an standard dummy for a very long time
      </HvWarningText>
      <HvButton
        style={btnStyle}
        onClick={() => {
          setFormStatus("valid");
        }}
      >
        Set form as valid
      </HvButton>
      <HvButton
        style={btnStyle}
        onClick={() => {
          setFormStatus("invalid");
        }}
      >
        Set form as invalid
      </HvButton>
    </HvFormElement>
  );
};

WarningTextWithStatus.parameters = {
  v3: true,
  docs: {
    description: {
      story:
        "Warning text showcasing the ability to notify the user and to react to the form status."
    }
  }
};

export const DisabledWarningText = () => {
  const [disabled, setDisabled] = useState(false);
  const btnStyle = { margin: "10px" };

  return (
    <>
      <HvWarningText id="warningText-disabled" isVisible disabled={disabled}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been an standard dummy for a very long time
      </HvWarningText>
      <HvButton
        style={btnStyle}
        onClick={() => {
          setDisabled(false);
        }}
      >
        Set enable status
      </HvButton>
      <HvButton
        style={btnStyle}
        onClick={() => {
          setDisabled(true);
        }}
      >
        Set disabled status
      </HvButton>
    </>
  );
};

DisabledWarningText.parameters = {
  v3: true,
  docs: {
    description: { story: "Helper text showcasing the disabled state." }
  },
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast"
    ]
  }
};
