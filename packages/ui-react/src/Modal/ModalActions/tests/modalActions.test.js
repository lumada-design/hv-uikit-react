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

import ModalActionsWithStyles from "../index";
import ModalActions from "../ModalActions";

describe("ModalActions withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalActionsWithStyles>Modal Content</ModalActionsWithStyles>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ModalActions Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <ModalActions classes={{}}>
        Modal Content
      </ModalActions>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <ModalActions
        classes={{}}
        disableActionSpacing
      >
        Modal Content
      </ModalActions>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <ModalActions
        classes={{
          root: "testClassRoot",
          action: "testClassAction"
        }}
      >
        Modal Content
      </ModalActions>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
