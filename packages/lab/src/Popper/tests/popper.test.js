/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import Popper from "@material-ui/core/Popper";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import Paper from "@material-ui/core/Paper";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import withPopper from "../withPopper";
import Content from "../Content";

const data = {
  data1: "test data 1",
  data2: "test data 2",
  data3: "test data 3"
};

describe("Hv Popper HOC", () => {
  let wrapper;

  const btn = props => (
    <HvProvider>
      <button type="button" {...props}>
        popper button
      </button>
    </HvProvider>
  );

  beforeEach(() => {
    const BtnWithPopper = withPopper(btn, data);
    wrapper = mount(
      <HvProvider>
        <BtnWithPopper />
      </HvProvider>
    );
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
      const props = wrapper.props();

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
      wrapper = mount(<Content open classes={{}} content={{}} />);

      const popperProps = wrapper.find(Popper).props();

      expect(popperProps.open).toBeTruthy();
      expect(wrapper.find(Paper).length).toBe(1);
    });

    it("when given key-value pairs, they are displayed properly in the popper", () => {
      wrapper = mount(
        <HvProvider>
          <Content open classes={{}} content={data} />
        </HvProvider>
      );

      const keyValuePairs = wrapper.find(".key-value");
      expect(keyValuePairs.length).toBe(3);

      keyValuePairs.forEach((keyValue, i) => {
        expect(keyValue.props().children.length).toBe(2);

        const key = keyValue.find(HvTypography).get(0);
        expect(key.props.children).toBe(`data${i + 1}:`);

        const value = keyValue.find(HvTypography).get(1);
        expect(value.props.children).toBe(`test data ${i + 1}`);
      });
    });
  });
});
