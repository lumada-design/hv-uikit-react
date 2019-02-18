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
import { shallow } from "enzyme";

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
});
