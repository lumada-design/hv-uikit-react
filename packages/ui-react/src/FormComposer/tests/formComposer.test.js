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

import FormComposerWithStyles from "../index";
import FormComposer from "../FormComposer";

import HvProvider from "../../Provider";

describe("FormComposer withStyles", () => {
  let wrapper;

  const groups = [
    {
      title: "Group1",
      children: [
        <input
          name="input1"
          onChange={value => value}
        />,
        <input
          name="input2"
        />
      ]
    }
  ];

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <FormComposerWithStyles groups={groups} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Button component", () => {
    const formComposerComponent = wrapper.find(FormComposer);
    expect(formComposerComponent.length).toBe(1);
  });

});
