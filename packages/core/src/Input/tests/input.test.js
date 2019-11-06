/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import InfoS from "@hv/uikit-react-icons/dist/Generic/Info";
import InputWithStyles from "../index";
import Input from "../Input";
import validationStates from "../validationStates";
import validationTypes from "../validationTypes";
import iconPositions from "../iconPositions";
import HvProvider from "../../Provider";

const labels = {
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
        <InputWithStyles showInfo={false} />
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
          labels={labels}
          initialValue={inputText}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    testState(
      labels.infoText,
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
          labels={labels}
          initialValue={inputText}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    testState(
      labels.warningText,
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
          initialValue={inputText}
          onFocus={onFocus}
          labels={labels}
          validationIconPosition={iconPositions.left}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onFocusHandler();
    testState(
      labels.infoText,
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
          initialValue={inputText}
          onFocus={onFocus}
          labels={labels}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onFocusHandler();
    testState(
      labels.infoText,
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
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onChangeHandler({
      target: { name: "test", value: defaultInputText }
    });
    testState(
      labels.infoText,
      validationStates.filled,
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
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onChangeHandler({
      target: { name: "test", value: defaultInputText }
    });
    testState(
      labels.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
  });

  it("should fill the suggestion array", () => {
    const suggestions = [{label: "test"}];
    const inputText = "test2";
    const defaultInputText = "test1";
    const suggestionHandler = () => suggestions;
    const onChange = value => {
      expect(value).toBe(defaultInputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
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
    const suggestionSelected = jest.fn();
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          labels={labels}
          suggestionSelectedCallback={suggestionSelected}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.suggestionSelectedHandler({label: "test"});
    expect(suggestionSelected).toHaveBeenCalled();
  });

  it("should showInfo numbers on blur", () => {
    const inputText = "test";
    const defaultInputText = "233";
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.number}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(
      labels.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      labels.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
    inputInstance.onInputBlurHandler();
    testState(
      labels.warningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
  });

  it("should showInfo emails on blur", () => {
    const inputText = "notEmail";
    const defaultInputText = "email@example.com";
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
          initialValue={defaultInputText}
          onChange={onChange}
          labels={labels}
          validationType={validationTypes.email}
        />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.onInputBlurHandler();
    testState(
      labels.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      labels.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
    inputInstance.onInputBlurHandler();
    testState(
      labels.warningText,
      validationStates.invalid,
      inputText,
      inputInstance
    );
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
        <InputWithStyles
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
    testState(
      labels.warningText,
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
    testState(
      labels.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      labels.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
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
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
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
    testState(
      labels.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      labels.infoText,
      validationStates.filled,
      inputText,
      inputInstance
    );
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
    const onChange = value => {
      expect(value).toBe(inputText);
      return inputText;
    };
    wrapper = mount(
      <HvProvider>
        <InputWithStyles
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
    testState(
      labels.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      labels.infoText,
      validationStates.empty,
      inputText,
      inputInstance
    );
    inputInstance.onInputBlurHandler();
    testState(
      labels.requiredWarningText,
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
    testState(
      labels.infoText,
      validationStates.valid,
      defaultInputText,
      inputInstance
    );
    inputInstance.onChangeHandler({
      target: { name: "test", value: inputText }
    });
    testState(
      labels.infoText,
      validationStates.empty,
      inputText,
      inputInstance
    );
    inputInstance.onInputBlurHandler();
    testState(
      labels.infoText,
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
        <InputWithStyles initialValue={defaultInputText} labels={labels} />
      </HvProvider>
    );
    const inputInstance = getInput(wrapper);
    inputInstance.handleClear();
    expect(inputInstance.state.infoText).toBe(labels.infoText);
    expect(inputInstance.state.validationState).toBe(validationStates.empty);
    expect(inputInstance.state.value).toBe(inputText);
  });

  const getInputInstance = (defaultProps, newValue) => {
    wrapper = mount(
      React.createElement(
        props => (
          <HvProvider>
            <InputWithStyles
              initialValue={props.value}
              inputValue={props.inputValue}
              labels={labels}
            />
          </HvProvider>
        ),
        defaultProps
      )
    );
    wrapper.setProps({ inputValue: newValue });
    wrapper.update();
    return getInput(wrapper);
  };

  it("should change the state value when the inputValue prop changes", () => {
    const inputText1 = "inputText1";
    const inputText2 = "inputText2";
    const defaultProps = {
      initialValue: inputText1
    };

    const inputInstance = getInputInstance(defaultProps, inputText2);
    expect(inputInstance.state.infoText).toBe(labels.infoText);
    expect(inputInstance.state.validationState).toBe(validationStates.empty);
    expect(inputInstance.state.value).toBe(inputText2);
  });

  it("should show the info icon and the info label", () => {
    wrapper = mount(
      <HvProvider>
        <InputWithStyles infoIcon labels={labels} />
      </HvProvider>
    );
    const inputComponent = wrapper.find(InfoS);
    expect(inputComponent.length).toBe(1);
    const labelParagraph = wrapper.find("p");
    expect(labelParagraph.length).toBe(2);
  });

  it("should show the info label and not the info icon", () => {
    wrapper = mount(
      <HvProvider>
        <InputWithStyles labels={labels} />
      </HvProvider>
    );
    const iconInfo = wrapper.find(InfoS);
    expect(iconInfo.length).toBe(0);
    const labelParagraph = wrapper.find("p");
    expect(labelParagraph.length).toBe(2);
  });
});
