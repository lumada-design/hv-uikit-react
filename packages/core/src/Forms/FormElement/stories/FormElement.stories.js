import React, { useState } from "react";
import { HvFormElement, HvBaseInput, HvInfoText, HvLabel } from "../../..";

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
    if (hasNumber(value)) {
      setElementStatus("invalid");
      return;
    }
    setElementStatus("valid");
  };

  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  return (
    <>
      <HvFormElement elementValue={inputValue} elementStatus={elementStatus}>
        <HvLabel id={inputLabelId} htmlFor={inputId} label="First name" />
        <HvBaseInput
          id={inputId}
          inputProps={{
            "aria-labelledby": inputLabelId
          }}
          value="test"
          aria-labelledby={inputLabelId}
          placeholder="Insert your name"
          onChange={onChangeHandler}
          onBlur={() => validateValue(inputValue)}
          style={{ paddingTop: "8px" }}
        />
        <HvInfoText
          style={{ marginTop: "8px" }}
          label="Write your name in this input do not put numbers"
          showWhen="standBy"
        />
        <HvInfoText
          style={{ marginTop: "8px" }}
          label="Names do not contain numbers"
          showWhen="invalid"
        />
        <HvInfoText style={{ marginTop: "8px" }} label="Your value is valid" showWhen="valid" />
      </HvFormElement>
    </>
  );
};

export const FormElementInvalid = () => {
  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  return (
    <>
      <HvFormElement elementValue="Albert2" elementStatus="invalid">
        <HvLabel id={inputLabelId} htmlFor={inputId} label="First name" />
        <HvBaseInput
          style={{ paddingTop: "8px" }}
          inputProps={{
            "aria-labelledby": inputLabelId
          }}
          aria-labelledby={inputLabelId}
        />
        <HvInfoText
          style={{ marginTop: "8px" }}
          label="Names do not contain numbers"
          showWhen="invalid"
        />
      </HvFormElement>
    </>
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
  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  return (
    <>
      <HvFormElement elementValue="Hello" elementStatus="valid">
        <HvLabel id={inputLabelId} htmlFor={inputId} label="First name" />
        <HvBaseInput
          style={{ paddingTop: "8px" }}
          inputProps={{
            "aria-labelledby": inputLabelId
          }}
          aria-labelledby={inputLabelId}
        />
        <HvInfoText style={{ marginTop: "8px" }} label="Your value is valid" showWhen="valid" />
      </HvFormElement>
    </>
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
  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  return (
    <>
      <HvFormElement elementStatus="valid">
        <HvLabel
          id={inputLabelId}
          htmlFor={inputId}
          style={{ marginBottom: "8px" }}
          label="First name"
          disabled
        />
        <HvBaseInput
          style={{ paddingTop: "8px" }}
          placeholder="Insert your name"
          disabled
          inputProps={{
            "aria-labelledby": inputLabelId
          }}
          aria-labelledby={inputLabelId}
        />
        <HvInfoText
          style={{ marginTop: "8px" }}
          label="Your value is valid"
          showWhen="valid"
          disabled
        />
      </HvFormElement>
    </>
  );
};

FormElementValid.story = {
  parameters: {
    docs: {
      storyDescription: "Form element propagating the valid state to the input."
    }
  }
};
