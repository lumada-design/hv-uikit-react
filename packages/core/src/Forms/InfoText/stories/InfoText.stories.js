import React from "react";

import InfoText from "../InfoText";

export default {
  title: "Components/Forms/InfoText",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvInfoText } from '@hv/uikit-react-core/dist'"
  },
  component: InfoText
};

export const Main = () => {
  return (
    <>
      <InfoText id="base" infoTextStatus="valid" label="extra details" showWhen="valid" />
    </>
  );
};

export const InfoErrorState = () => {
  return (
    <>
      <InfoText
        id="base"
        infoTextStatus="invalid"
        label="something when wrong"
        showWhen="invalid"
      />
    </>
  );
};

export const disabledInfoText = () => {
  return (
    <>
      <InfoText
        id="base"
        infoTextStatus="invalid"
        label="something when wrong"
        showWhen="invalid"
        disabled
      />
    </>
  );
};
