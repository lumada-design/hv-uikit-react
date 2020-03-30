/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import InfoS from "@hv/uikit-react-icons/dist/Info";
import MapS from "@hv/uikit-react-icons/dist/Map";
import validationStates from "../validationStates";
import validationTypes from "../validationTypes";
import iconPositions from "../iconPositions";
import HvProvider from "../../Provider";
import Input from "..";

/* eslint-disable no-console */

const labels = {
  inputLabel: "inputLabel",
  placeholder: "placeholder",
  infoText: "infoText",
  warningText: "warningText",
  maxCharQuantityWarningText: "maxCharQuantityWarningText",
  minCharQuantityWarningText: "minCharQuantityWarningText",
  requiredWarningText: "requiredWarningText"
};

const testState = (warningText, state, value, instance) => {
  expect(instance.state.warningText).toBe(warningText);
  expect(instance.state.validationState).toBe(state);
  expect(instance.state.value).toBe(value);
};

describe("Input", () => {
  let wrapper;

  const getInputProps = ParentElement => ParentElement.find("HvInput").props();
  const getInput = ParentElement => ParentElement.find("HvInput").instance();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Input />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const inputComponent = wrapper.find("HvInput");
    expect(inputComponent.length).toBe(1);
  });

  it("should disable the Input component", () => {
    wrapper = mount(
      <HvProvider>
        <Input disabled />
      </HvProvider>
    );
    expect(getInputProps(wrapper).disabled).toBe(true);
  });

  it("should not have the validation section", () => {
    wrapper = mount(
      <HvProvider>
        <Input showInfo={false} />
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should pass other props to the child input component", () => {
    wrapper = mount(
      <HvProvider>
        <Input
          inputProps={{
            maxLength: 250
          }}
        />
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should accept valid as a default state", () => {
    const inputText = "test";
    wrapper = mount(
      <HvProvider>
        <Input validationState={validationStates.valid} labels={labels} initialValue={inputText} />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    testState(null, validationStates.valid, inputText, inputInstance);
  });

  it("should accept invalid as a default state", () => {
    const inputText = "test";
    wrapper = mount(
      <HvProvider>
        <Input
          validationState={validationStates.invalid}
          labels={labels}
          initialValue={inputText}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    testState(labels.warningText, validationStates.invalid, inputText, inputInstance);
  });

  it("should return the value on focus and correctly update the state", () => {
    const inputText = "test";
    const onFocus = value => {
      expect(value).toBe(inputText);
    };
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={inputText}
          onFocus={onFocus}
          labels={labels}
          validationIconPosition={iconPositions.left}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onFocusHandler();
    testState(null, validationStates.filled, inputText, inputInstance);
  });

  it("should return the value on focus and correctly update the state if the value is blank", () => {
    const inputText = "";
    const onFocus = value => {
      expect(value).toBe(inputText);
    };
    wrapper = mount(
      <HvProvider>
        <Input initialValue={inputText} onFocus={onFocus} labels={labels} />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onFocusHandler();
    testState(null, validationStates.empty, inputText, inputInstance);
  });

  it("should return the value on change and correctly update the state", () => {
    const inputText = "test2";
    const defaultInputText = "test1";
    const onChange = (event, value) => {
      expect(value).toBe(defaultInputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input initialValue={defaultInputText} onChange={onChange} labels={labels} />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onChangeHandler({
      target: { name: "test", value: defaultInputText }
    });
    testState(null, validationStates.filled, inputText, inputInstance);
  });

  it("should return the value on change and correctly update the state", () => {
    const inputText = "test2";
    const defaultInputText = "test1";
    const onChange = (event, value) => {
      expect(value).toBe(defaultInputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input initialValue={defaultInputText} onChange={onChange} labels={labels} />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onChangeHandler({
      target: { name: "test", value: defaultInputText }
    });
    testState(null, validationStates.filled, inputText, inputInstance);
  });

  it("should fill the suggestion array", () => {
    const suggestions = [{ label: "test" }];
    const inputText = "test2";
    const defaultInputText = "test1";
    const suggestionHandler = () => suggestions;
    const onChange = (event, value) => {
      expect(value).toBe(defaultInputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={defaultInputText}
          suggestionListCallback={suggestionHandler}
          onChange={onChange}
          labels={labels}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onChangeHandler({
      target: { name: "test", value: defaultInputText }
    });
    expect(inputInstance.state.suggestionValues).toEqual(suggestions);
  });

  it("should call the selected callback", () => {
    const originalError = console.error;
    // Hide console error: "A component is changing an uncontrolled input of type text to be controlled. "
    console.error = jest.fn();

    const suggestionSelected = jest.fn();
    wrapper = mount(
      <HvProvider>
        <Input labels={labels} suggestionSelectedCallback={suggestionSelected} />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.suggestionSelectedHandler({ label: "test" });
    expect(suggestionSelected).toHaveBeenCalled();

    console.error = originalError;
  });

  it("should showInfo numbers on blur", () => {
    const inputText = "test";
    const defaultInputText = "233";
    const onChange = (event, value) => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.number}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(null, validationStates.valid, defaultInputText, inputInstance);
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(null, validationStates.filled, inputText, inputInstance);
    inputInstance.onInputBlurHandler();
    testState(labels.warningText, validationStates.invalid, inputText, inputInstance);
  });

  it("should showInfo emails on blur", () => {
    const inputText = "notEmail";
    const defaultInputText = "email@example.com";
    const onChange = (event, value) => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.email}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(null, validationStates.valid, defaultInputText, inputInstance);
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(null, validationStates.filled, inputText, inputInstance);
    inputInstance.onInputBlurHandler();
    testState(labels.warningText, validationStates.invalid, inputText, inputInstance);
  });

  it("should showInfo use custom validations on blur", () => {
    const inputText = "test";
    const defaultInputText = "test2";
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    const validate = () => false;
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.none}
          validation={validate}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(labels.warningText, validationStates.invalid, defaultInputText, inputInstance);
  });

  it("should check maximum number of characters on blur", () => {
    const inputText = "Very Long string";
    const defaultInputText = "short";
    const quantity = 8;
    const onChange = (event, value) => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.none}
          maxCharQuantity={quantity}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(null, validationStates.valid, defaultInputText, inputInstance);
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(null, validationStates.filled, inputText, inputInstance);
    inputInstance.onInputBlurHandler();
    testState(
      labels.maxCharQuantityWarningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should check minimum number of characters on blur", () => {
    const inputText = "short";
    const defaultInputText = "very long string";
    const quantity = 8;
    const onChange = (event, value) => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.none}
          minCharQuantity={quantity}
          password
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(null, validationStates.valid, defaultInputText, inputInstance);
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(null, validationStates.filled, inputText, inputInstance);
    inputInstance.onInputBlurHandler();
    testState(
      labels.minCharQuantityWarningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should fail validation if empty when required", () => {
    const inputText = "";
    const defaultInputText = "very long string";
    const quantity = 8;
    const onChange = (event, value) => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.none}
          minCharQuantity={quantity}
          isRequired
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(null, validationStates.valid, defaultInputText, inputInstance);
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(null, validationStates.empty, inputText, inputInstance);
    inputInstance.onInputBlurHandler();
    testState(labels.requiredWarningText, validationStates.invalid, inputText, inputInstance);
  });

  it("should pass validation if empty when not required", () => {
    const inputText = "";
    const defaultInputText = "very long string";
    const quantity = 8;
    const onChange = (event, value) => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <Input
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.none}
          minCharQuantity={quantity}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(null, validationStates.valid, defaultInputText, inputInstance);
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(null, validationStates.empty, inputText, inputInstance);
    inputInstance.onInputBlurHandler();
    testState(null, validationStates.empty, inputText, inputInstance);
  });

  it("should clear the value", () => {
    const inputText = "";
    const defaultInputText = "test1";
    wrapper = mount(
      <HvProvider>
        <Input initialValue={defaultInputText} labels={labels} />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.handleClear();
    testState(null, validationStates.empty, inputText, inputInstance);
  });

  const getInputInstance = (defaultProps, newValue) => {
    wrapper = mount(
      React.createElement(
        props => (
          <HvProvider>
            <Input value={props.value} labels={labels} />
          </HvProvider>
        ),
        defaultProps
      )
    );
    wrapper.setProps({ value: newValue });
    wrapper.update();
    return getInput(wrapper);
  };

  it("should change the state value when the value prop changes", () => {
    const inputText1 = "inputText1";
    const inputText2 = "inputText2";
    const defaultProps = {
      initialValue: inputText1
    };

    const inputInstance = getInputInstance(defaultProps, inputText2);
    testState(null, validationStates.empty, inputText2, inputInstance);
  });

  it("should show the info icon and the info label", () => {
    wrapper = mount(
      <HvProvider>
        <Input infoIcon labels={labels} />
      </HvProvider>
    );
    const inputComponent = wrapper.find(InfoS);
    expect(inputComponent.length).toBe(1);
    const labelParagraph = wrapper.find("p");
    expect(labelParagraph.length).toBe(2);
  });

  it("should show the custom map icon and the info label", () => {
    wrapper = mount(
      <HvProvider>
        <Input labels={labels} customFixedIcon={<MapS />} />
      </HvProvider>
    );
    const inputComponent = wrapper.find(MapS);
    expect(inputComponent.length).toBe(1);
    const labelParagraph = wrapper.find("p");
    expect(labelParagraph.length).toBe(2);
  });

  it("should show the info label and not the info icon", () => {
    wrapper = mount(
      <HvProvider>
        <Input labels={labels} />
      </HvProvider>
    );
    const iconInfo = wrapper.find(InfoS);
    expect(iconInfo.length).toBe(0);
    const labelParagraph = wrapper.find("p");
    expect(labelParagraph.length).toBe(2);
  });

  const getWrapper = wrap => {
    const invalidInputClassRegEx = /inputRootInvalid/g;
    return invalidInputClassRegEx.exec(wrap.html());
  };

  it("should correctly outline input on error/correct state", () => {
    const inputText1 = undefined;
    const inputText2 = "Some Value";
    const defaultProps = {
      initialValue: inputText1,
      value: undefined,
      validationState: "invalid"
    };

    wrapper = mount(
      <HvProvider>
        <Input {...defaultProps} labels={labels} />
      </HvProvider>
    );

    const inputComponent = wrapper.find("HvInput").instance();

    expect(inputComponent.state.validationState).toBe(validationStates.invalid);
    expect(inputComponent.state.value).toBe(undefined);
    // check for invalid class applied to input
    expect(getWrapper(wrapper).length).toBe(1);

    inputComponent.setState({
      value: inputText2,
      validationState: "filled"
    });
    wrapper.update();

    expect(inputComponent.state.validationState).toBe(validationStates.filled);
    expect(inputComponent.state.value).toBe(inputText2);
    // check for invalid class applied to input -> should not be applied
    expect(getWrapper(wrapper)).toBe(null);
  });
});
