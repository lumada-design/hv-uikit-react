import React, { useState } from "react";

import { HvHelperText, HvButton } from "../../..";

export default {
  title: "Components/Forms/InfoText",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvHelperText } from '@hv/uikit-react-core/dist'"
  },
  component: HvHelperText
};

export const Main = () => {
  return (
    <HvHelperText id="helperText">Write your name in this input do not put numbers</HvHelperText>
  );
};

export const HelperTextNotification = () => {
  const [notificationText, setNotificationText] = useState("");
  const btnStyle = {
    width: "250px",
    height: "50px",
    margin: "10px"
  };
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
        clear notification text
      </HvButton>
    </>
  );
};

HelperTextNotification.story = {
  parameters: {
    docs: {
      storyDescription:
        "Helper text showcasing the ability to notify the user by replacing the description text."
    }
  }
};

export const DisabledInfoText = () => {
  return (
    <HvHelperText id="helperText-disabled" disabled>
      Write your name in this input do not put numbers
    </HvHelperText>
  );
};

DisabledInfoText.story = {
  parameters: {
    docs: {
      storyDescription: "Helper text showcasing the disabled state."
    }
  }
};
