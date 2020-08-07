import React from "react";
import { HvBaseInput, HvLabel } from "../../..";

export default {
  title: "Components/Forms/Base Input",
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

export const multiLine = () => {
  return (
    <HvBaseInput
      id="multiline"
      aria-label="input multiline"
      placeholder="Enter text"
      inputProps={{
        "aria-label": "multiline text area"
      }}
      multiline
      rows={6}
    />
  );
};

multiLine.story = {
  parameters: {
    docs: {
      storyDescription: "Showcasing the multiline input style."
    },
    v3: true
  }
};

export const multiLineResize = () => {
  return (
    <HvBaseInput
      id="multiline-resize"
      aria-label="input multiline"
      placeholder="Enter text"
      inputProps={{
        "aria-label": "multiline text area"
      }}
      multiline
      resizable
      rows={6}
    />
  );
};

multiLineResize.story = {
  parameters: {
    docs: {
      storyDescription: "Showcasing the multiline input style with resizing."
    },
    v3: true
  }
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

export const DisabledMultiLine = () => {
  return (
    <HvBaseInput
      id="disabled-text-area"
      aria-label="disabled text area"
      placeholder="Enter text"
      inputProps={{
        "aria-label": "disabled text area"
      }}
      multiline
      disabled
      rows={6}
    />
  );
};

DisabledMultiLine.story = {
  parameters: {
    docs: {
      storyDescription: "Showcasing the disabled multiline input style."
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

export const InvalidMultiLine = () => {
  return (
    <HvBaseInput
      id="invalid-text-area"
      aria-label="invalid text area"
      placeholder="Enter text"
      inputProps={{
        "aria-label": "invalid text area"
      }}
      multiline
      invalid
      rows={6}
    />
  );
};

InvalidMultiLine.story = {
  parameters: {
    docs: {
      storyDescription: "Showcasing the invalid multiline input style."
    },
    v3: true
  }
};
