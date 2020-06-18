import React, { useState } from "react";
import { HvFormElement, HvBaseInput, HvHelperText, HvLabel } from "../../..";

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
  const [notificationText, setNotificationText] = useState("");
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
      setNotificationText("");
      return;
    }
    if (hasNumber(value)) {
      setElementStatus("invalid");
      setNotificationText("Names do not contain numbers");
      return;
    }
    setElementStatus("valid");
    setNotificationText("Your value is valid");
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
      <HvHelperText key="2" id="infotext-main" notification={notificationText}>
        Write your name in this input do not put numbers
      </HvHelperText>
    </HvFormElement>
  );
};

export const FormElementInvalid = () => {
  return (
    <HvFormElement elementValue="Albert2" elementStatus="invalid">
      <HvLabel key="1" id="invalid-input-label" label="First name">
        <HvBaseInput id="invalid-input" />
      </HvLabel>
      <HvHelperText key="2" id="error-text-invalid" notification="Names do not contain numbers">
        Write your name in this input do not put numbers
      </HvHelperText>
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
      <HvHelperText key="2" id="info-text-valid">
        Your value is valid
      </HvHelperText>
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
      <HvHelperText key="2" id="info-text-valid-disabled">
        Your value is valid
      </HvHelperText>
    </HvFormElement>
  );
};

FormElementDisabled.story = {
  parameters: {
    docs: {
      storyDescription: "Form element propagating the disabled state to the input."
    }
  }
};
