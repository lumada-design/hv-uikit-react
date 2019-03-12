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

import InputAdornment from "../InputAdornment";
import validationStates from "../validationStates";

describe("InputAdornment", () => {
  let wrapper;
  const handleClearMock = jest.fn();

  beforeEach(async () => {
    handleClearMock.mockClear();

    wrapper = mount(
      <InputAdornment
        classes={{}}
        validationState={validationStates.filled}
        handleClear={handleClearMock}
      />
    );
  });

  it("should be defined", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleClear when mouseDown", () => {
    wrapper.simulate("mousedown");
    expect(handleClearMock).toHaveBeenCalled();
  });

  it("should call handleClear when keydown", () => {
    wrapper.simulate("keydown");
    expect(handleClearMock).toHaveBeenCalled();
  });

  it("should not call handleClear when mousedown and keydown when not clickable", () => {
    wrapper = mount(
      <InputAdornment
        classes={{}}
        validationState={validationStates.valid}
        handleClear={handleClearMock}
      />
    );

    wrapper.simulate("keydown");
    wrapper.simulate("mousedown");

    expect(handleClearMock).not.toHaveBeenCalled();
  });


});
