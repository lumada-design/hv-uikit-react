/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import InputWithStyles from "../..";
import Input from "../Input";
import validationStates from "../validationStates";
import validationTypes from "../validationTypes";
import iconPositions from "../iconPositions";
import HvProvider from "../../../Provider";

const inputTextConfiguration = {
  inputLabel: "inputLabel",
  placeholder: "placeholder",
  infoText: "infoText",
  warningText: "warningText",
  maxCharQuantityWarningText: "maxCharQuantityWarningText",
  minCharQuantityWarningText: "minCharQuantityWarningText",
  requiredWarningText: "requiredWarningText"
};

const testState = (infoText, state, value, instance) => {
  expect(instance.state.infoText).toBe(infoText);
  expect(instance.state.validationState).toBe(state);
  expect(instance.state.value).toBe(value);
};

describe("Input", () => {
  let wrapper;

  const getInputProps = ParentElement =>
    ParentElement.find(InputWithStyles).props();
  const getInput = ParentElement => ParentElement.find(Input).instance();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <InputWithStyles />
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
    const inputComponent = wrapper.find(Input);
    expect(inputComponent.length).toBe(1);
  });

  it("should disable the Input component", () => {
    wrapper = mount(
      <HvProvider>
        <InputWithStyles disabled />
      </HvProvider>
    );
    expect(getInputProps(wrapper).disabled).toBe(true);
  });

  it("should not have the validation section", () => {
    wrapper = mount(
      <HvProvider>
        <InputWithStyles validate={false} />
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should pass other props to the child input component", () => {
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
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
        <InputWithStyles
          validationState={validationStates.valid}
          inputTextConfiguration={inputTextConfiguration}
          value={inputText}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    testState(
      inputTextConfiguration.infoText,
      validationStates.valid,
      inputText,
      inputInstance
    );
  });

  it("should accept invalid as a default state", () => {
    const inputText = "test";
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          validationState={validationStates.invalid}
          inputTextConfiguration={inputTextConfiguration}
          value={inputText}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    testState(
      inputTextConfiguration.warningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should return the value on focus and correctly update the state", () => {
    const inputText = "test";
    const onFocus = value => {
      expect(value).toBe(inputText);
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={inputText}
          onFocus={onFocus}
          inputTextConfiguration={inputTextConfiguration}
          iconPosition={iconPositions.left}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onFocusHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
  });

  it("should return the value on focus and correctly update the state if the value is blank", () => {
    const inputText = "";
    const onFocus = value => {
      expect(value).toBe(inputText);
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={inputText}
          onFocus={onFocus}
          inputTextConfiguration={inputTextConfiguration}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onFocusHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.empty,
      inputText,
      inputInstance
    );
  });

  it("should return the value on change and correctly update the state", () => {
    const inputText = "test2";
    const defaultInputText = "test1";
    const onChange = value => {
      expect(value).toBe(defaultInputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          onChange={onChange}
          inputTextConfiguration={inputTextConfiguration}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onChangeHandler({
      target: { name: "test", value: defaultInputText }
    });
    testState(
      inputTextConfiguration.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
  });

  it("should validate numbers on blur", () => {
    const inputText = "test";
    const defaultInputText = "233";
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          onChange={onChange}
          inputTextConfiguration={inputTextConfiguration}
          validationType={validationTypes.number}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      inputTextConfiguration.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.warningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should validate emails on blur", () => {
    const inputText = "notEmail";
    const defaultInputText = "email@example.com";
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          onChange={onChange}
          inputTextConfiguration={inputTextConfiguration}
          validationType={validationTypes.email}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      inputTextConfiguration.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.warningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should validate use custom validations on blur", () => {
    const inputText = "test";
    const defaultInputText = "test2";
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    const validate = () => false;
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          onChange={onChange}
          inputTextConfiguration={inputTextConfiguration}
          validationType={validationTypes.none}
          validation={validate}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.warningText,
      validationStates.invalid,
      defaultInputText,
      inputInstance
    );
  });

  it("should check maximum number of characters on blur", () => {
    const inputText = "Very Long string";
    const defaultInputText = "short";
    const quantity = 8;
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          onChange={onChange}
          inputTextConfiguration={inputTextConfiguration}
          validationType={validationTypes.none}
          maxCharQuantity={quantity}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      inputTextConfiguration.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.maxCharQuantityWarningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should check minimum number of characters on blur", () => {
    const inputText = "short";
    const defaultInputText = "very long string";
    const quantity = 8;
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          onChange={onChange}
          inputTextConfiguration={inputTextConfiguration}
          validationType={validationTypes.none}
          minCharQuantity={quantity}
          password
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      inputTextConfiguration.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.minCharQuantityWarningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should fail validation if empty when required", () => {
    const inputText = "";
    const defaultInputText = "very long string";
    const quantity = 8;
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          onChange={onChange}
          inputTextConfiguration={inputTextConfiguration}
          validationType={validationTypes.none}
          minCharQuantity={quantity}
          isRequired
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      inputTextConfiguration.infoText,
      validationStates.empty,
      inputText,
      inputInstance
    );
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.requiredWarningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should pass validation if empty when not required", () => {
    const inputText = "";
    const defaultInputText = "very long string";
    const quantity = 8;
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          onChange={onChange}
          inputTextConfiguration={inputTextConfiguration}
          validationType={validationTypes.none}
          minCharQuantity={quantity}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      inputTextConfiguration.infoText,
      validationStates.empty,
      inputText,
      inputInstance
    );
    inputInstance.onBlurHandler();
    testState(
      inputTextConfiguration.infoText,
      validationStates.empty,
      inputText,
      inputInstance
    );
  });

  it("should clear the value", () => {
    const inputText = "";
    const defaultInputText = "test1";
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          value={defaultInputText}
          inputTextConfiguration={inputTextConfiguration}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.handleClear();
    expect(inputInstance.state.infoText).toBe(inputTextConfiguration.infoText);
    expect(inputInstance.state.validationState).toBe(validationStates.empty);
    expect(inputInstance.state.value).toBe(inputText);
  });
});
