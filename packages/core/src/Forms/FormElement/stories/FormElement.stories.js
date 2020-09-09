import { CloseXS, Success } from "@hv/uikit-react-icons";
import React, { useRef, useState } from "react";

import {
  HvFormElement,
  HvBaseInput,
  HvCharCounter,
  HvLabel,
  HvAdornment,
  HvInfoMessage,
  HvWarningText,
  setId
} from "../../..";

export default {
  title: "Components/Forms/Form Element",
  parameters: {
    v3: true,
    componentSubtitle: null,
    usage: "import { HvFormElement } from '@hv/uikit-react-core/dist'"
  },
  component: HvFormElement,
  decorators: [storyFn => <div style={{ width: "600px" }}>{storyFn()}</div>]
};

export const Main = () => {
  const [elementValue, setElementValue] = useState("");
  const [elementStatus, setElementStatus] = useState("standBy");
  const [showCloseAdornment, setShowCloseAdornment] = useState(false);

  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";
  const inputReference = useRef(null);

  const setElement = (value = "", setStatus = true) => {
    const hasNumber = /\d/.test(value);
    const isEmpty = !value || value.length === 0;

    if (setStatus) {
      setElementStatus((hasNumber && "invalid") || (isEmpty && "standBy") || "valid");
    }
    isEmpty ? setShowCloseAdornment(false) : setShowCloseAdornment(true);
    setElementValue(value);
  };

  const onFocusHandler = event => {
    const { type } = event.target;
    if (type === "button") return;
    if (!event.currentTarget.contains(document.activeElement) || elementStatus !== "standBy") {
      setElementStatus("standBy");
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
  const onBlurHandler = event => {
    if (event.relatedTarget === null || event?.relatedTarget?.id !== setId(inputId, "clear")) {
      setElement(event.target.value);
      setShowCloseAdornment(false);
    }
  };

  const onMouseLeaveHandler = event => {
    if (!event.currentTarget.contains(document.activeElement)) setShowCloseAdornment(false);
  };

  const onMouseEnterHandler = () => {
    if (elementValue) setShowCloseAdornment(true);
  };

  return (
    <HvFormElement
      onBlur={event => onBlurHandler(event)}
      onFocus={event => onFocusHandler(event)}
      value={elementValue}
      status={elementStatus}
    >
      <HvLabel id={inputLabelId} label="First name">
        <HvInfoMessage id="main-info-message"> Do not put numbers.</HvInfoMessage>
        <HvBaseInput
          id={inputId}
          inputRef={inputReference}
          placeholder="Insert your name"
          onChange={(event, value) => setElement(value, false)}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={event => onMouseLeaveHandler(event)}
          endAdornment={
            <>
              <HvAdornment
                id={setId(inputId, "clear")}
                isVisible={showCloseAdornment}
                onClick={() => {
                  setElement("");
                  setTimeout(() => {
                    inputReference.current?.focus();
                  });
                }}
                icon={<CloseXS />}
                aria-label="clear button"
              />
              <HvAdornment showWhen="valid" icon={<Success semantic="sema1" />} />
            </>
          }
        />
      </HvLabel>
      <HvWarningText id="warning-text">Names do not contain numbers.</HvWarningText>
    </HvFormElement>
  );
};

export const TextAreaFormElement = () => {
  const [elementValue, setElementValue] = useState("");
  const [elementStatus, setElementStatus] = useState("standBy");

  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";
  const maxCharacterQuantity = 30;
  const inputReference = useRef(null);

  const setElement = (value = "") => {
    const isOverloaded = value.length > maxCharacterQuantity;
    const isEmpty = !value || value.length === 0;
    setElementStatus((isOverloaded && "invalid") || (isEmpty && "standBy"));
    setElementValue(value);
  };

  const onFocusHandler = event => {
    const { type } = event.target;
    if (type === "button") return;
    if (!event.currentTarget.contains(document.activeElement) || elementStatus !== "standBy") {
      setElementStatus("standBy");
    }
  };

  const onBlurHandler = event => {
    if (event.relatedTarget === null || event.relatedTarget === undefined) {
      setElement(event.target.value);
    }
  };

  return (
    <HvFormElement
      onBlur={event => onBlurHandler(event)}
      onFocus={event => onFocusHandler(event)}
      value={elementValue}
      status={elementStatus}
    >
      <HvLabel id={inputLabelId} label="First name">
        <HvCharCounter
          id="main-info-message"
          currentCharQuantity={elementValue.length}
          maxCharQuantity={maxCharacterQuantity}
        />
        <HvBaseInput
          id={inputId}
          inputRef={inputReference}
          placeholder="Insert your name"
          onChange={(event, value) => setElement(value)}
          multiline
        />
      </HvLabel>
      <HvWarningText id="warning-text">Too many characters.</HvWarningText>
    </HvFormElement>
  );
};

TextAreaFormElement.parameters = {
  v3: true,
  docs: {
    description: { story: "Form element propagating the invalid state to the input." }
  }
};

export const FormElementInvalid = () => {
  return (
    <HvFormElement value="Albert2" status="invalid">
      <HvLabel id="invalid-input-label" label="First name">
        <HvInfoMessage id="invalid-info-message"> Do not put numbers.</HvInfoMessage>
        <HvBaseInput id="invalid-input" />
      </HvLabel>
      <HvWarningText id="invalid-warning-text">Names do not contain numbers.</HvWarningText>
    </HvFormElement>
  );
};

FormElementInvalid.parameters = {
  v3: true,
  docs: {
    description: { story: "Form element propagating the invalid state to the input." }
  }
};

export const FormElementValid = () => {
  return (
    <HvFormElement value="Hello" status="valid">
      <HvLabel id="valid-input-label" label="First name">
        <HvInfoMessage id="main-info-message"> Do not put numbers.</HvInfoMessage>
        <HvBaseInput
          id="valid-input"
          endAdornment={<HvAdornment showWhen="valid" icon={<Success semantic="sema1" />} />}
        />
      </HvLabel>
      <HvWarningText id="valid-warning-text">Names do not contain numbers.</HvWarningText>
    </HvFormElement>
  );
};

FormElementValid.parameters = {
  v3: true,
  docs: {
    description: { story: "Form element propagating the valid state to the input." }
  }
};

export const FormElementDisabled = () => {
  return (
    <HvFormElement status="valid" disabled>
      <HvLabel id="disabled-input-label" label="First name">
        <HvInfoMessage>Info message here</HvInfoMessage>
        <HvBaseInput id="disable-input" placeholder="Insert your name" />
      </HvLabel>
      <HvWarningText id="disabled-warning-text">Names do not contain numbers.</HvWarningText>
    </HvFormElement>
  );
};

FormElementDisabled.parameters = {
  docs: {
    v3: true,
    description: { story: "Form element propagating the disabled state to the input." }
  },
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast"
    ]
  }
};
