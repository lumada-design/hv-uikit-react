/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import HvProvider from "../../Provider";

import VerticalNavigation from "../index";

describe("<VerticalNavigation />", () => {
  const toggleOpenCallbackMock = jest.fn();

  let wrapper;

  describe("collapsable closed vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <VerticalNavigation
            isOpen={false}
            isCollapsable
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </VerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <VerticalNavigation
            isOpen
            isCollapsable
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </VerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("non-collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <VerticalNavigation
            isOpen
            isCollapsable={false}
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </VerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("non-collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <VerticalNavigation
            isOpen={false}
            isCollapsable={false}
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </VerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
