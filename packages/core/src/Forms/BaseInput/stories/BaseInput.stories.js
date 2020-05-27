import React from "react";

import { HvBaseInput, HvLabel } from "../../..";

export default {
  title: "Components/Forms/BaseInput",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBaseInput } from '@hv/uikit-react-core/dist'"
  },
  component: HvBaseInput,
  decorators: [storyFn => <div style={{ width: "600px" }}>{storyFn()}</div>]
};

export const Main = () => {
  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  return (
    <>
      <HvLabel id={inputLabelId} htmlFor={inputId} label="First name" />
      <HvBaseInput
        placeholder="Insert data"
        inputProps={{
          "aria-labelledby": inputLabelId
        }}
        aria-labelledby={inputLabelId}
        style={{ paddingTop: "8px" }}
      />
    </>
  );
};

export const DisabledInput = () => {
  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";
  return (
    <>
      <HvLabel id={inputLabelId} htmlFor={inputId} label="First name" disabled />
      <HvBaseInput
        placeholder="Insert data"
        inputProps={{
          "aria-labelledby": inputLabelId
        }}
        aria-labelledby={inputLabelId}
        style={{ paddingTop: "8px" }}
        disabled
      />
    </>
  );
};

DisabledInput.story = {
  parameters: {
    docs: {
      storyDescription: "Disabled input."
    }
  }
};

export const InvalidInput = () => {
  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";
  return (
    <>
      <HvLabel id={inputLabelId} htmlFor={inputId} label="First name" disabled />
      <HvBaseInput
        placeholder="Insert first name"
        id="input-simple-with-info-icon-sample"
        inputProps={{
          "aria-labelledby": inputLabelId
        }}
        style={{ paddingTop: "8px" }}
        invalid
      />
    </>
  );
};

InvalidInput.story = {
  parameters: {
    docs: {
      storyDescription: "Input in Invalid State."
    }
  }
};
