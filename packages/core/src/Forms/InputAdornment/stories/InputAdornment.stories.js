import React from "react";

import { CloseXS, Success, Fail } from "@hv/uikit-react-icons";

import { HvBaseInput, HvFormElement, HvLabel, HvInputAdornment } from "../../..";

export default {
  title: "Components/Forms/Input Adornment",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvInputAdornment } from '@hv/uikit-react-core/dist'"
  },
  component: HvInputAdornment,
  decorators: [storyFn => <div style={{ width: "600px" }}>{storyFn()}</div>]
};

export const Main = () => {
  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  return (
    <HvFormElement value="valid input content" status="standBy">
      <HvLabel id={inputLabelId} label="First name">
        <HvBaseInput
          id={inputId}
          placeholder="Insert your name"
          endAdornment={
            <>
              <HvInputAdornment showWhen="standBy" icon={<CloseXS />} />
            </>
          }
        />
      </HvLabel>
    </HvFormElement>
  );
};

export const ValidInput = () => {
  const inputId = "valid-controlled-input";
  const inputLabelId = "valid-controlled-input-label";

  return (
    <HvFormElement value="valid input content" status="valid">
      <HvLabel id={inputLabelId} label="First name">
        <HvBaseInput
          id={inputId}
          placeholder="Insert your name"
          endAdornment={
            <>
              <HvInputAdornment showWhen="invalid" icon={<Fail semantic="sema4" />} />
              <HvInputAdornment showWhen="valid" icon={<Success semantic="sema1" />} />
            </>
          }
        />
      </HvLabel>
    </HvFormElement>
  );
};

ValidInput.story = {
  parameters: {
    docs: {
      storyDescription: "Input adornment displayed for valid input value."
    }
  }
};

export const InvalidInput = () => {
  const inputId = "invalid-controlled-input";
  const inputLabelId = "invalid-controlled-input-label";

  return (
    <HvFormElement value="invalid input content" status="invalid">
      <HvLabel id={inputLabelId} label="First name">
        <HvBaseInput
          id={inputId}
          placeholder="Insert your name"
          endAdornment={
            <>
              <HvInputAdornment showWhen="invalid" icon={<Fail semantic="sema4" />} />
              <HvInputAdornment showWhen="valid" icon={<Success semantic="sema1" />} />
            </>
          }
        />
      </HvLabel>
    </HvFormElement>
  );
};

InvalidInput.story = {
  parameters: {
    docs: {
      storyDescription: "Input adornment displayed for invalid input value."
    }
  }
};
