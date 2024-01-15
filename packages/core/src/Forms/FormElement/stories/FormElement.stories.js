import React, { useState } from "react";

import { CloseXS, Success, Fail } from "@hitachivantara/uikit-react-icons";

import { HvFormElement, HvBaseInput, HvHelperText, HvLabel, HvAdornment, setId } from "../../..";

export default {
  title: "Components/Forms/Form Element",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFormElement } from "@hitachivantara/uikit-react-core";',
  },
  component: HvFormElement,
  decorators: [(storyFn) => <div style={{ width: "600px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const [elementValue, setElementValue] = useState("");
  const [elementStatus, setElementStatus] = useState("standBy");
  const [showCloseAdornment, setShowCloseAdornment] = useState(false);
  const [notificationText, setNotificationText] = useState(
    "Write your name in this input do not put numbers"
  );

  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";

  const setElement = (value = "", setStatus = true) => {
    const hasNumber = /\d/.test(value);
    const isEmpty = !value || value.length === 0;

    if (setStatus) {
      setElementStatus((hasNumber && "invalid") || (isEmpty && "standBy") || "valid");
      setNotificationText(
        (hasNumber && "Names do not contain numbers") ||
          (isEmpty && "Write your name in this input do not put numbers") ||
          "Your value is valid"
      );
    }
    isEmpty ? setShowCloseAdornment(false) : setShowCloseAdornment(true);
    setElementValue(value);
  };

  const onFocusHandler = (event) => {
    const { type } = event.target;
    if (type === "button") return;
    if (!event.currentTarget.contains(document.activeElement) || elementStatus !== "standBy") {
      setElementStatus("standBy");
      setNotificationText(undefined);
      if (!showCloseAdornment && elementValue) {
        setShowCloseAdornment(true);
        return;
      }
      if (showCloseAdornment && !elementValue) {
        setShowCloseAdornment(false);
      }
    }
  };

  /**
   * Extra validation is needed because of the close adornment.
   *
   * @param event
   */
  const onBlurHandler = (event) => {
    if (event.relatedTarget === null || event?.relatedTarget?.id !== setId(inputId, "clear")) {
      setElement(event.target.value);
      setShowCloseAdornment(false);
    }
  };

  const onMouseLeaveHandler = (event) => {
    if (!event.currentTarget.contains(document.activeElement)) setShowCloseAdornment(false);
  };

  const onMouseEnterHandler = () => {
    if (elementValue) setShowCloseAdornment(true);
  };

  return (
    <HvFormElement
      onBlur={(event) => onBlurHandler(event)}
      onFocus={(event) => onFocusHandler(event)}
      value={elementValue}
      status={elementStatus}
    >
      <HvLabel id={inputLabelId} label="First name">
        <HvBaseInput
          id={inputId}
          placeholder="Insert your name"
          onChange={(event, value) => setElement(value, false)}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={(event) => onMouseLeaveHandler(event)}
          endAdornment={
            <>
              <HvAdornment
                id={setId(inputId, "clear")}
                isVisible={showCloseAdornment}
                onClick={() => {
                  setElement("");
                }}
                icon={<CloseXS />}
                aria-label="clear button"
              />
              <HvAdornment showWhen="invalid" icon={<Fail semantic="sema4" />} />
              <HvAdornment showWhen="valid" icon={<Success semantic="sema1" />} />
            </>
          }
        />
      </HvLabel>
      <HvHelperText key="2" id="info-text-valid" notification={notificationText}>
        Write your name in this input do not put numbers
      </HvHelperText>
    </HvFormElement>
  );
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
      storyDescription: "Form element propagating the invalid state to the input.",
    },
  },
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
      storyDescription: "Form element propagating the valid state to the input.",
    },
  },
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
      storyDescription: "Form element propagating the disabled state to the input.",
    },
    pa11y: {
      ignore: [
        "region",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
      ],
    },
  },
};
