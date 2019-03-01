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
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";

import ModalContentWithStyles from "../index";
import ModalContent from "../ModalContent";

describe("ModalContent withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalContentWithStyles>Modal Content</ModalContentWithStyles>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ModalContent Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<ModalContent classes={{}}>Modal Content</ModalContent>);
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <ModalContent
        classes={{
          root: "testClassRoot"
        }}
      >
        Modal Content
      </ModalContent>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
