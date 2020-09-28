/* eslint-env jest */

import React from "react";
import { mount, shallow } from "enzyme";

import { HvProvider, HvTextArea } from "../..";
import { Main } from "../stories/TextArea.stories";

describe("TextArea", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvTextArea)).toMatchSnapshot();
  });
});

describe("TextArea Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <HvTextArea rows={4} initialValue="test" onChange={() => {}} />
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(HvTextArea)).toMatchSnapshot();
  });

  it("should save the current value length on change", () => {
    const value = "value";
    const onChangeMock = jest.fn(() => value);
    const wrapperMount = mount(
      <HvProvider>
        <HvTextArea rows={4} initialValue="test" onChange={onChangeMock} maxCharQuantity={10} />
      </HvProvider>
    );
    const instance = wrapperMount.find("HvTextArea").instance();
    instance.onChangeHandler(null, value);
    expect(onChangeMock).toHaveBeenCalled();
    expect(instance.state.currentValueLength).toBe(5);
  });

  it("should limit the current value length on change", () => {
    const value = "value value value";
    const onChangeMock = jest.fn(() => value);
    const wrapperMount = mount(
      <HvProvider>
        <HvTextArea
          rows={4}
          initialValue="test"
          onChange={onChangeMock}
          maxCharQuantity={5}
          blockMax
        />
      </HvProvider>
    );
    const instance = wrapperMount.find("HvTextArea").instance();
    instance.onChangeHandler(null, value);
    expect(onChangeMock).toHaveBeenCalled();
    expect(instance.state.currentValueLength).toBe(5);
  });

  it("shouldn't limit the current value length on change", () => {
    const value = "value value value";
    const onChangeMock = jest.fn(() => value);
    const wrapperMount = mount(
      <HvProvider>
        <HvTextArea initialValue="test" onChange={onChangeMock} maxCharQuantity={5} />
      </HvProvider>
    );
    const instance = wrapperMount.find("HvTextArea").instance();
    instance.onChangeHandler(null, value);
    expect(onChangeMock).toHaveBeenCalled();
    expect(instance.state.currentValueLength).toBe(17);
  });

  it("should render the count label correctly", () => {
    const wrapperMount = mount(
      <HvProvider>
        <HvTextArea
          rows={4}
          initialValue="test"
          labels={{
            startCount: "Inserted",
            middleCount: "of",
            endCount: "available",
          }}
          maxCharQuantity={10}
        />
      </HvProvider>
    );
    const label = wrapperMount.find("HvTextArea").find("span");
    expect(label.at(0).text()).toBe("Inserted 4 of 10 available");
  });

  //--------------------------

  const getInputInstance = (defaultProps, value) => {
    wrapper = mount(
      React.createElement(
        (props) => (
          <HvProvider>
            <HvTextArea
              value={props.value}
              rows={4}
              initialValue={props.value}
              onChange={props.onChangeMock}
              maxCharQuantity={props.maxCharQuantity}
              blockMax={props.blockMax}
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
      onChange: onChangeMock,
    };
    const instance = getInputInstance(defaultProps, value);
    expect(instance.state.currentValueLength).toBe(4);
  });

  it("should limit the current value length on change of value", () => {
    const defaultProps = {
      initialValue: "four",
      maxCharQuantity: 5,
      blockMax: true,
    };
    const instance = getInputInstance(defaultProps, "onethousand");
    expect(instance.state.currentValueLength).toBe(5);
  });

  it("shouldn't limit the current value length on change of value", () => {
    const defaultProps = {
      initialValue: "four",
    };
    const instance = getInputInstance(defaultProps, "onethousand");
    expect(instance.state.currentValueLength).toBe(11);
  });

  it("should scroll down on update when autoScroll", () => {
    const wrapperMount = mount(
      <HvProvider>
        <HvTextArea classes={{}} value="test" autoScroll />
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
        <HvTextArea classes={{}} value="test" autoScroll />
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
