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

import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import DropDownMenu from "../index";
import HvProvider from "../../Provider";
import Popper from "../../utils/Popper";

jest.mock(
  "popper.js",
  () =>
    class {
      constructor() {
        return {
          scheduleUpdate: jest.fn(),
          update: jest.fn(),
          destroy: jest.fn()
        };
      }
    }
);

describe("DropDownMenu", () => {
  let wrapper;
  const SPACE = " ";
  const ENTER = "Enter";

  const menuOptions = [
    {
      label: "Label 1"
    },
    {
      label: "Label 2"
    },
    {
      label: "Label 3"
    }
  ];

  describe("component", () => {
    beforeEach(() => {
      wrapper = mount(
        <HvProvider>
          <DropDownMenu dataList={menuOptions} icon={<div />} />
        </HvProvider>
      );
    });

    it("is rendered correctly and behaves as expected", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("opens on click", () => {
      const button = wrapper.find("div");
      button.at(1).simulate("click");

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("closes on double click", () => {
      const button = wrapper.find("div");
      button.at(0).simulate("click");
      button.at(0).simulate("click");
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("opens on Enter", () => {
      const button = wrapper.find('div[role="button"]');

      button.simulate("keydown", { key: ENTER });
      expect(wrapper.find(Popper).props().open).toBe(true);
    });

    it("closes on double Enter", () => {
      const button = wrapper.find('div[role="button"]');

      button.simulate("keydown", { key: ENTER });
      expect(wrapper.find(Popper).props().open).toBe(true);

      button.simulate("keydown", { key: ENTER });
      expect(wrapper.find(Popper).props().open).toBe(false);
    });

    it("opens on Space", () => {
      const button = wrapper.find('div[role="button"]');

      button.simulate("keydown", { key: SPACE });
      expect(wrapper.find(Popper).props().open).toBe(true);
    });

    it("closes on double Space", () => {
      const button = wrapper.find('div[role="button"]');

      button.simulate("keydown", { key: SPACE });
      expect(wrapper.find(Popper).props().open).toBe(true);

      button.simulate("keydown", { key: SPACE });
      expect(wrapper.find(Popper).props().open).toBe(false);
    });

    it("opens and closes mixing mouse click, Enter, and Space", () => {
      const button = wrapper.find('div[role="button"]');

      button.simulate("click");
      expect(wrapper.find(Popper).props().open).toBe(true);

      button.simulate("keydown", { key: ENTER });
      expect(wrapper.find(Popper).props().open).toBe(false);

      button.simulate("keydown", { key: SPACE });
      expect(wrapper.find(Popper).props().open).toBe(true);

      button.simulate("click");
      expect(wrapper.find(Popper).props().open).toBe(false);
    });
  });
});
