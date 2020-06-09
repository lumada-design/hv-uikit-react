import React, { useState } from "react";
import { HvFormElement, HvBaseInput, HvInfoText, HvErrorText, HvLabel } from "../../..";

export default {
  title: "Components/Forms",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvFormElement } from '@hv/uikit-react-core/dist'"
  },
  component: HvFormElement,
  decorators: [storyFn => <div style={{ width: "600px" }}>{storyFn()}</div>]
};

export const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [elementStatus, setElementStatus] = useState("standBy");

  const hasNumber = string => {
    return /\d/.test(string);
  };

  const onChangeHandler = (event, value = "") => {
    setInputValue(value);
  };

  const validateValue = value => {
    if (value === "") {
      setElementStatus("standBy");
      return;
    }
    if (hasNumber(value)) {
      setElementStatus("invalid");
      return;
    }
    setElementStatus("valid");
  };

  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  return (
    <HvFormElement elementValue={inputValue} elementStatus={elementStatus}>
      <HvLabel key="1" id={inputLabelId} label="First name">
        <HvBaseInput
          id={inputId}
          placeholder="Insert your name"
          onChange={onChangeHandler}
          onBlur={() => validateValue(inputValue)}
        />
      </HvLabel>
      <HvInfoText
        key="2"
        id="infotext-main-standby"
        label="Write your name in this input do not put numbers"
        showWhen="standBy"
      />
      <HvInfoText key="3" id="infotext-main-valid" label="Your value is valid" showWhen="valid" />
      <HvErrorText
        key="4"
        id="error-text-main"
        label="Names do not contain numbers"
        showWhen="invalid"
      />
    </HvFormElement>
  );
};

export const FormElementInvalid = () => {
  return (
    <HvFormElement elementValue="Albert2" elementStatus="invalid">
      <HvLabel key="1" id="invalid-input-label" label="First name">
        <HvBaseInput id="invalid-input" />
      </HvLabel>
      <HvErrorText
        key="2"
        id="error-text-invalid"
        label="Names do not contain numbers"
        showWhen="invalid"
      />
    </HvFormElement>
  );
};

FormElementInvalid.story = {
  parameters: {
    docs: {
      storyDescription: "Form element propagating the invalid state to the input."
    }
  }
};

export const FormElementValid = () => {
  return (
    <HvFormElement elementValue="Hello" elementStatus="valid">
      <HvLabel key="1" id="valid-input-label" label="First name">
        <HvBaseInput id="valid-input" />
      </HvLabel>
      <HvInfoText key="2" id="info-text-valid" label="Your value is valid" showWhen="valid" />
    </HvFormElement>
  );
};

FormElementValid.story = {
  parameters: {
    docs: {
      storyDescription: "Form element propagating the valid state to the input."
    }
  }
};

export const FormElementDisabled = () => {
  return (
    <HvFormElement elementStatus="valid" elementDisabled>
      <HvLabel key="1" id="disabled-input-label" label="First name">
        <HvBaseInput id="disable-input" placeholder="Insert your name" />
      </HvLabel>
      <HvInfoText
        key="2"
        id="info-text-valid-disabled"
        label="Your value is valid"
        showWhen="valid"
      />
    </HvFormElement>
  );
};

FormElementDisabled.story = {
  parameters: {
    docs: {
      storyDescription: "Form element propagating the valid state to the input."
    }
  }
};
