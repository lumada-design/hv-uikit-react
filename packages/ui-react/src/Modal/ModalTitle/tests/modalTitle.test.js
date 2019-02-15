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

import HvProvider from "../../../Provider";

import ModalTitleWithStyles from "../index";
import ModalTitle from "../ModalTitle";

describe("ModalContent withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalTitleWithStyles>Modal Content</ModalTitleWithStyles>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ModalTitle Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<ModalTitle classes={{}}>Modal Content</ModalTitle>);
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <ModalTitle classes={{}} disableTypography>
        Modal Title
      </ModalTitle>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <ModalTitle
        classes={{
          root: "testClassRoot"
        }}
      >
        Modal Content
      </ModalTitle>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
