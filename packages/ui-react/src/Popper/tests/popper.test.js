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
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withPopper from "../withPopper";
import Content from "../Content";

const data = {
  data1: "test data 1",
  data2: "test data 2",
  data3: "test data 3"
};

describe("Hv Popper HOC", () => {
  let wrapper;

  const btn = props => <button {...props}>popper button</button>;

  beforeEach(() => {
    const BtnWithPopper = withPopper(btn, data);
    wrapper = mount(<BtnWithPopper />);
  });

  describe("index", () => {
    it("should be defined", () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe("is rendered correctly and behaves as expected", () => {
    it("should have a button and a popper", () => {
      const button = wrapper.find("button");
      const popper = wrapper.find(Popper);

      expect(button.length).toBe(1);
      expect(popper.length).toBe(1);
    });

    it("by default popper is closed", () => {
      const popper = wrapper.find(Popper);
      const popperProps = popper.props();

      expect(popperProps.open).toBeFalsy();
      expect(popperProps.anchorEl).toBeNull();
    });
  });
});

describe("Hv Popper", () => {
  let wrapper;

  describe("index", () => {
    it("should be defined", () => {
      wrapper = mount(<Content open={false} classes={{}} content={{}} />);
      expect(wrapper).toBeDefined();
    });

    it("mandatory and default properties are defined and received", () => {
      let props = wrapper.props();

      expect(props.classes).toBeDefined();
      expect(props.content).toBeDefined();
      expect(props.open).toBeDefined();
    });
  });

  describe("is rendered correctly and behaves as expected", () => {
    it("when set to close, no popper is shown", () => {
      wrapper = mount(<Content open={false} classes={{}} content={{}} />);

      const popperProps = wrapper.find(Popper).props();

      expect(popperProps.open).toBeFalsy();
      expect(wrapper.find(Paper).length).toBe(0);
    });

    it("when set to open, popper is shown", () => {
      wrapper = mount(<Content open={true} classes={{}} content={{}} />);

      const popperProps = wrapper.find(Popper).props();

      expect(popperProps.open).toBeTruthy();
      expect(wrapper.find(Paper).length).toBe(1);
    });

    it("when given key-value pairs, they are displayed properly in the popper", () => {
      wrapper = mount(<Content open={true} classes={{}} content={data} />);

      const keyValuePairs = wrapper.find(".key-value");
      expect(keyValuePairs.length).toBe(3);

      keyValuePairs.forEach((keyValue, i) => {
        expect(keyValue.props().children.length).toBe(2);

        const key = keyValue.find(Typography).get(0);
        expect(key.props.children).toBe(`data${i + 1}:`);

        const value = keyValue.find(Typography).get(1);
        expect(value.props.children).toBe(`test data ${i + 1}`);
      });
    });
  });
});
