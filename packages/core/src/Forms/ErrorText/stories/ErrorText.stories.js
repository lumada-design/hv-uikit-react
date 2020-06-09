import React from "react";
import { HvErrorText } from "../../..";

export default {
  title: "Components/Forms/ErrorText",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvErrorText } from '@hv/uikit-react-core/dist'"
  },
  component: HvErrorText
};

export const Main = () => {
  return <HvErrorText id="base" errorTextStatus="valid" label="extra details" showWhen="valid" />;
};

export const DisabledErrorText = () => {
  return (
    <HvErrorText
      id="disabled"
      errorTextStatus="invalid"
      label="something when wrong"
      showWhen="invalid"
      disabled
    />
  );
};

DisabledErrorText.story = {
  parameters: {
    docs: {
      storyDescription: "Disabled error text showcasing the appropiate style."
    }
  }
};
