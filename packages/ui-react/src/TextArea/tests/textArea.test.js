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

// import { mount } from "enzyme";
import React from "react";
import { shallow, mount } from "enzyme";

import HvProvider from "../../Provider";

import TextAreaWithStyles from "../index";
import TextArea from "../TextArea";

describe("TextArea withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <TextAreaWithStyles />
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
      <TextArea classes={{}} rows={4} value="test" onChange={() => {}} />
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
        <TextAreaWithStyles classes={{}} rows={4} value="test" onChange={onChangeMock} maxCharQuantity={10} />
      </HvProvider>
    );
    const instance = wrapperMount.find(TextArea).instance();
    instance.onChangeHandler(value);
    expect(onChangeMock).toHaveBeenCalled();
    expect(instance.state.currentValueLength).toBe(5);
  });

  it("should limit the current value length on change", () => {
    const value = "value value value";
    const onChangeMock = jest.fn(() => value);
    const wrapperMount = mount(
      <HvProvider>
        <TextAreaWithStyles classes={{}} rows={4} value="test" onChange={onChangeMock} maxCharQuantity={5} />
      </HvProvider>
    );
    const instance = wrapperMount.find(TextArea).instance();
    instance.onChangeHandler(value);
    expect(onChangeMock).toHaveBeenCalled();
    expect(instance.state.currentValueLength).toBe(5);
  });
});
