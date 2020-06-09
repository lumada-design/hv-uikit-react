import React from "react";

import { HvInfoText } from "../../..";

export default {
  title: "Components/Forms/InfoText",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvInfoText } from '@hv/uikit-react-core/dist'"
  },
  component: HvInfoText
};

export const Main = () => {
  return <HvInfoText id="base" infoTextStatus="valid" label="extra details" showWhen="valid" />;
};

export const InfoInvalidState = () => {
  return (
    <HvInfoText
      id="base"
      infoTextStatus="invalid"
      label="something when wrong"
      showWhen="invalid"
    />
  );
};

InfoInvalidState.story = {
  parameters: {
    docs: {
      storyDescription: "Info text showcasing the invalid style."
    }
  }
};

export const DisabledInfoText = () => {
  return (
    <HvInfoText
      id="disabled"
      infoTextStatus="invalid"
      label="something when wrong"
      showWhen="invalid"
      disabled
    />
  );
};

DisabledInfoText.story = {
  parameters: {
    docs: {
      storyDescription: "Info text showcasing the disabled."
    }
  }
};
