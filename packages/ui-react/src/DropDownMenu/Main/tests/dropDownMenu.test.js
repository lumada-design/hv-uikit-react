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
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import IconButton from "@material-ui/core/IconButton";

import DropDownMenu from "../..";
import DropDownMenuComponent from "../DropDownMenu";
import HvProvider from "../../../Provider";

describe("DropDownMenu", () => {
  let wrapper;

  describe("index", () => {
    beforeAll(() => {
      wrapper = mount(
        <HvProvider>
          <DropDownMenu icon={<div />}>
            <div />
          </DropDownMenu>
        </HvProvider>
      );
    });

    it("should render without throwing any error", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe("component", () => {
    beforeEach(() => {
      wrapper = mount(
        <DropDownMenuComponent classes={{}} icon={<div />}>
          <div />
        </DropDownMenuComponent>
      );
    });

    it("is rendered correctly and behaves as expected", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("opens on click", () => {
      const button = wrapper.find(IconButton);
      button.at(0).simulate("click");

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
