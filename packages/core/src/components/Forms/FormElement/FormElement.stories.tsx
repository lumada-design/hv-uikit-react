import { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CloseXS, Success } from "@hitachivantara/uikit-react-icons";
import {
  HvBaseInput,
  HvFormElement,
  HvFormElementProps,
  HvLabel,
  HvWarningText,
  HvInfoMessage,
  HvAdornment,
  HvFormStatus,
} from "components";
import { setId } from "utils";

const meta: Meta<typeof HvFormElement> = {
  title: "Guides/Forms/Form Element",
  component: HvFormElement,
};
export default meta;

export const Main: StoryObj<HvFormElementProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    const [elementValue, setElementValue] = useState("");
    const [elementStatus, setElementStatus] = useState<HvFormStatus>("standBy");
    const [showCloseAdornment, setShowCloseAdornment] = useState(false);

    const inputId = "controlled-input";
    const inputReference = useRef<HTMLElement>(null);

    const setElement = (value = "", setStatus = true) => {
      const hasNumber = /\d/.test(value);
      const isEmpty = !value || value.length === 0;

      if (setStatus) {
        setElementStatus(
          (hasNumber && "invalid") || (isEmpty && "standBy") || "valid"
        );
      }
      setShowCloseAdornment(!isEmpty);
      setElementValue(value);
    };

    const onFocusHandler = (event) => {
      const { type } = event.target;
      if (type === "button") return;
      if (
        !event.currentTarget.contains(document.activeElement) ||
        elementStatus !== "standBy"
      ) {
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
      if (
        event.relatedTarget === null ||
        event?.relatedTarget?.id !== setId(inputId, "clear")
      ) {
        setElement(event.target.value);
        setShowCloseAdornment(false);
      }
    };

    const onMouseLeaveHandler = (event) => {
      if (!event.currentTarget.contains(document.activeElement))
        setShowCloseAdornment(false);
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
          <HvInfoMessage id="main-info-message">
            Do not put numbers.
          </HvInfoMessage>
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
                <HvAdornment
                  showWhen="valid"
                  icon={<Success semantic="positive" />}
                />
              </>
            }
          />
        </HvLabel>
        <HvWarningText id="warning-text" disableBorder>
          Names do not contain numbers.
        </HvWarningText>
      </HvFormElement>
    );
  },
};

export const FormElementInvalid: StoryObj<HvFormElementProps> = {
  parameters: {
    docs: {
      description: {
        story: "Form element propagating the invalid state to the input.",
      },
    },
  },
  render: () => {
    return (
      <HvFormElement status="invalid">
        <HvLabel id="invalid-input-label" label="First name">
          <HvInfoMessage id="invalid-info-message">
            Do not put numbers.
          </HvInfoMessage>
          <HvBaseInput id="invalid-input" defaultValue="Albert2" />
        </HvLabel>
        <HvWarningText id="invalid-warning-text" disableBorder>
          Names do not contain numbers.
        </HvWarningText>
      </HvFormElement>
    );
  },
};

export const FormElementValid: StoryObj<HvFormElementProps> = {
  parameters: {
    docs: {
      description: {
        story: "Form element propagating the valid state to the input.",
      },
    },
  },
  render: () => {
    return (
      <HvFormElement status="valid">
        <HvLabel id="valid-input-label" label="First name">
          <HvInfoMessage id="valid-info-message">
            This will always be valid.
          </HvInfoMessage>
          <HvBaseInput
            id="valid-input"
            defaultValue="Hello"
            endAdornment={
              <HvAdornment
                showWhen="valid"
                icon={<Success semantic="positive" />}
              />
            }
          />
        </HvLabel>
        <HvWarningText id="valid-warning-text">
          Names do not contain numbers.
        </HvWarningText>
      </HvFormElement>
    );
  },
};

export const FormElementDisabled: StoryObj<HvFormElementProps> = {
  parameters: {
    docs: {
      description: {
        story: "Form element propagating the disabled state to the input.",
      },
    },
  },
  render: () => {
    return (
      <HvFormElement disabled status="invalid">
        <HvLabel label="First name">
          <HvInfoMessage id="the-disabled-description">
            Info message here
          </HvInfoMessage>
          <HvBaseInput id="the-disabled-input" placeholder="Insert your name" />
        </HvLabel>
        <HvWarningText id="the-disabled-error">
          Names do not contain numbers.
        </HvWarningText>
      </HvFormElement>
    );
  },
};
