import React, { useState } from "react";
import { HvFormElement, HvBaseInput, HvHelperText, HvLabel } from "../../..";

export default {
  title: "Components/Forms/FormElement",
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
  const [status, setStatus] = useState("standBy");

  const hasNumber = string => {
    return /\d/.test(string);
  };

  const onChangeHandler = (event, value = "") => {
    setInputValue(value);
  };

  const validateValue = value => {
    if (value === "") {
      setStatus("standBy");
      setNotificationText("");
      return;
    }
    if (hasNumber(value)) {
      setStatus("invalid");
      setNotificationText("Names do not contain numbers");
      return;
    }
    setStatus("valid");
    setNotificationText("Your value is valid");
  };

  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  return (
    <HvFormElement value={inputValue} status={status}>
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

Main.story = {
  parameters: {
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Properties missing on production:
        // https://github.com/lumada-design/hv-uikit-react/issues/1703
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        "label"
      ]
    }
  }
};

export const FormElementInvalid = () => {
  return (
    <HvFormElement value="Albert2" status="invalid">
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
    },
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Properties missing on production:
        // https://github.com/lumada-design/hv-uikit-react/issues/1703
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        "label"
      ]
    }
  }
};

export const FormElementValid = () => {
  return (
    <HvFormElement value="Hello" status="valid">
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
    },
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Properties missing on production:
        // https://github.com/lumada-design/hv-uikit-react/issues/1703
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        "label"
      ]
    }
  }
};

export const FormElementDisabled = () => {
  return (
    <HvFormElement status="valid" disabled>
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
    },
    pa11y: {
      ignore: [
        "region",
        // TODO: BUG Properties missing on production:
        // https://github.com/lumada-design/hv-uikit-react/issues/1703
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        "label",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast"
      ]
    }
  }
};
