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
import { mount, shallow } from "enzyme";
import { axe, toHaveNoViolations } from "jest-axe";

import HvProvider from "../../Provider";
import TextArea from "..";

expect.extend(toHaveNoViolations);

describe("TextArea withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <TextArea />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("TextArea Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <TextArea rows={4} initialValue="test" onChange={() => {}} />
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should save the current value length on change", () => {
    const value = "value";
    const onChangeMock = jest.fn(() => value);
    const wrapperMount = mount(
      <HvProvider>
        <TextArea
          rows={4}
          initialValue="test"
          onChange={onChangeMock}
          maxCharQuantity={10}
        />
      </HvProvider>
    );
    const instance = wrapperMount.find("HvTextArea").instance();
    instance.onChangeHandler(value);
    expect(onChangeMock).toHaveBeenCalled();
    expect(instance.state.currentValueLength).toBe(5);
  });

  it("should limit the current value length on change", () => {
    const value = "value value value";
    const onChangeMock = jest.fn(() => value);
    const wrapperMount = mount(
      <HvProvider>
        <TextArea
          rows={4}
          initialValue="test"
          onChange={onChangeMock}
          maxCharQuantity={5}
        />
      </HvProvider>
    );
    const instance = wrapperMount.find("HvTextArea").instance();
    instance.onChangeHandler(value);
    expect(onChangeMock).toHaveBeenCalled();
    expect(instance.state.currentValueLength).toBe(5);
  });

  //--------------------------

  const getInputInstance = (defaultProps, value) => {
    wrapper = mount(
      React.createElement(
        props => (
          <HvProvider>
            <TextArea
              value={props.value}
              rows={4}
              initialValue={props.value}
              onChange={props.onChangeMock}
              maxCharQuantity={props.maxCharQuantity}
            />
          </HvProvider>
        ),
        defaultProps
      )
    );
    wrapper.setProps({ value });
    wrapper.update();
    const inputInstance = wrapper.find("HvTextArea").instance();
    return inputInstance;
  };

  it("should save the current value length on change of value", () => {
    const value = "four";
    const onChangeMock = jest.fn(() => value);
    const defaultProps = {
      initialValue: "example",
      onChange: onChangeMock
    };
    const instance = getInputInstance(defaultProps, value);
    expect(instance.state.currentValueLength).toBe(4);
  });

  it("should limit the current value length on change of value", () => {
    const defaultProps = {
      initialValue: "four",
      maxCharQuantity: 5
    };
    const instance = getInputInstance(defaultProps, "onethousand");
    expect(instance.state.currentValueLength).toBe(5);
  });

  it("should scroll down on update when autoScroll", () => {
    const wrapperMount = mount(
      <HvProvider>
        <TextArea classes={{}} value="test" autoScroll />
      </HvProvider>
    );
    const instance = wrapperMount.find("HvTextArea").instance();
    const inputElement = wrapperMount.find("textarea").getDOMNode();

    expect(instance.state.autoScrolling).toBe(true);
    expect(instance.textInputRef.current).toBeDefined();
    expect(inputElement.scrollTop).toBe(0);

    Object.defineProperty(inputElement, "scrollHeight", { value: 30 });
    Object.defineProperty(inputElement, "clientHeight", { value: 10 });

    wrapperMount.setProps({ value: "trigger update" });
    expect(inputElement.scrollTop).toBe(20);
  });

  it("should stop and resume autoScrolling on scroll", () => {
    const wrapperMount = mount(
      <HvProvider>
        <TextArea classes={{}} value="test" autoScroll />
      </HvProvider>
    );
    const instance = wrapperMount.find("HvTextArea").instance();
    const inputElement = wrapperMount.find("textarea").getDOMNode();
    expect(instance.state.autoScrolling).toBe(true);
    Object.defineProperty(inputElement, "scrollHeight", { value: 30 });
    Object.defineProperty(inputElement, "clientHeight", { value: 10 });

    inputElement.scrollTop = 10;
    inputElement.dispatchEvent(new Event("scroll"));
    expect(instance.state.autoScrolling).toBe(false);

    inputElement.scrollTop = 20;
    inputElement.dispatchEvent(new Event("scroll"));
    expect(instance.state.autoScrolling).toBe(true);
  });
});

describe("TextAreaA11Y", () => {
  it("Simple", async () => {
    const onChangeMock = jest.fn();
    const labels = {
      inputLabel: "Label",
      placeholder: "Enter value"
    };

    const wrapper = mount(
      <HvProvider>
        <TextArea
          labels={labels}
          classes={{}}
          rows={4}
          initialValue="test"
          onChange={onChangeMock}
          maxCharQuantity={10}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
