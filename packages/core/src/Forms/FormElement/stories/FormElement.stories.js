import { CloseXS, Success } from "@hv/uikit-react-icons";
import React, { useRef, useState } from "react";

import {
  HvFormElement,
  HvBaseInput,
  HvLabel,
  HvAdornment,
  HvInfoMessage,
  HvWarningText,
  setId,
} from "../../..";

export default {
  title: "Forms/Form Element",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFormElement } from "@hv/uikit-react-core"',
  },
  component: HvFormElement,
  decorators: [(storyFn) => <div style={{ width: "600px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const [elementValue, setElementValue] = useState("");
  const [elementStatus, setElementStatus] = useState("standBy");
  const [showCloseAdornment, setShowCloseAdornment] = useState(false);

  const inputId = "controlled-input";
  const inputReference = useRef(null);

  const setElement = (value = "", setStatus = true) => {
    const hasNumber = /\d/.test(value);
    const isEmpty = !value || value.length === 0;

    if (setStatus) {
      setElementStatus((hasNumber && "invalid") || (isEmpty && "standBy") || "valid");
    }
    setShowCloseAdornment(!isEmpty);
    setElementValue(value);
  };

  const onFocusHandler = (event) => {
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
      status={elementStatus}
    >
      <HvLabel id="controlled-input-label" label="First name">
        <HvInfoMessage id="main-info-message"> Do not put numbers.</HvInfoMessage>
        <HvBaseInput
          id={inputId}
          value={elementValue}
          inputRef={inputReference}
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
      <HvWarningText id="warning-text" disableBorder>
        Names do not contain numbers.
      </HvWarningText>
    </HvFormElement>
  );
};

export const FormElementInvalid = () => {
  return (
    <HvFormElement status="invalid">
      <HvLabel id="invalid-input-label" label="First name">
        <HvInfoMessage id="invalid-info-message"> Do not put numbers.</HvInfoMessage>
        <HvBaseInput id="invalid-input" defaultValue="Albert2" />
      </HvLabel>
      <HvWarningText id="invalid-warning-text" disableBorder>
        Names do not contain numbers.
      </HvWarningText>
    </HvFormElement>
  );
};

FormElementInvalid.parameters = {
  docs: {
    description: { story: "Form element propagating the invalid state to the input." },
  },
};

export const FormElementValid = () => {
  return (
    <HvFormElement status="valid">
      <HvLabel id="valid-input-label" label="First name">
        <HvInfoMessage id="valid-info-message"> Do not put numbers.</HvInfoMessage>
        <HvBaseInput
          id="valid-input"
          defaultValue="Hello"
          endAdornment={<HvAdornment showWhen="valid" icon={<Success semantic="sema1" />} />}
        />
      </HvLabel>
      <HvWarningText id="valid-warning-text">Names do not contain numbers.</HvWarningText>
    </HvFormElement>
  );
};

FormElementValid.parameters = {
  docs: {
    description: { story: "Form element propagating the valid state to the input." },
  },
};

export const FormElementDisabled = () => {
  return (
    <HvFormElement disabled status="invalid">
      <HvLabel label="First name">
        <HvInfoMessage id="the-disabled-description">Info message here</HvInfoMessage>
        <HvBaseInput id="the-disabled-input" placeholder="Insert your name" />
      </HvLabel>
      <HvWarningText id="the-disabled-error">Names do not contain numbers.</HvWarningText>
    </HvFormElement>
  );
};

FormElementDisabled.parameters = {
  docs: {
    description: { story: "Form element propagating the disabled state to the input." },
  },
};
