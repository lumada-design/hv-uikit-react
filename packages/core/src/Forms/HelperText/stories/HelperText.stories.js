import React, { useState } from "react";
import { HvHelperText, HvButton } from "../../..";

export default {
  title: "Components/Forms/Helper Text",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvHelperText } from "@hitachivantara/uikit-react-core";',
  },
  component: HvHelperText,
};

export const Main = () => (
  <HvHelperText id="helperText">Write your name in this input do not put numbers</HvHelperText>
);

export const HelperTextNotification = () => {
  const [notificationText, setNotificationText] = useState("");
  const btnStyle = { margin: "10px" };

  return (
    <>
      <HvHelperText id="helperText-notify" notification={notificationText}>
        This is a normal description for an element
      </HvHelperText>
      <HvButton
        style={btnStyle}
        onClick={() => {
          setNotificationText("This is a overwritten description to show a warning");
        }}
      >
        Set notification text
      </HvButton>
      <HvButton
        style={btnStyle}
        onClick={() => {
          setNotificationText("");
        }}
      >
        Clear notification text
      </HvButton>
    </>
  );
};

HelperTextNotification.story = {
  parameters: {
    docs: {
      storyDescription:
        "Helper text showcasing the ability to notify the user by replacing the description text.",
    },
  },
};

export const DisabledHelperText = () => {
  return (
    <HvHelperText id="helperText-disabled" disabled>
      Write your name in this input do not put numbers
    </HvHelperText>
  );
};

DisabledHelperText.story = {
  parameters: {
    docs: {
      storyDescription: "Helper text showcasing the disabled state.",
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
  },
};
