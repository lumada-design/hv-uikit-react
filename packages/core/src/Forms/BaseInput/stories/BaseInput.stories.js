import React from "react";
import { HvBaseInput, HvLabel } from "../../..";

export default {
  title: "Patterns/Forms/Base Input",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBaseInput } from '@hv/uikit-react-core/dist'",
    v3: true
  },
  component: HvBaseInput,
  decorators: [storyFn => <div style={{ width: "600px" }}>{storyFn()}</div>]
};

export const Main = () => {
  const inputLabelId = "controlled-input-label";

  return (
    <HvLabel id={inputLabelId} label="First name">
      <HvBaseInput
        id="main-input"
        placeholder="Insert data"
        inputProps={{
          "aria-labelledby": inputLabelId
        }}
      />
    </HvLabel>
  );
};

export const DisabledInput = () => {
  return (
    <HvBaseInput
      id="disabled-input"
      aria-label="disabled input"
      placeholder="Insert data"
      inputProps={{
        "aria-label": "disabled input"
      }}
      disabled
    />
  );
};

DisabledInput.story = {
  parameters: {
    docs: {
      storyDescription: "Showcasing the disabled input style."
    },
    v3: true
  }
};

export const InvalidInput = () => {
  return (
    <HvBaseInput
      id="invalid-input"
      aria-label="invalid input"
      invalid
      placeholder="Insert data"
      inputProps={{
        "aria-label": "invalid input"
      }}
    />
  );
};

InvalidInput.story = {
  parameters: {
    docs: {
      storyDescription: "Showcasing the input in Invalid State."
    },
    v3: true
  }
};
