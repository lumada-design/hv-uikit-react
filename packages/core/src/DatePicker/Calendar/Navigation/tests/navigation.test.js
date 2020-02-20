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
import HvDropLeftIcon from "@hv/uikit-react-icons/dist/Generic/DropLeftXS";
import HvDropRightIcon from "@hv/uikit-react-icons/dist/Generic/DropRightXS";
import HvProvider from "../../../../Provider";

import NavigationWrapper from "../index";
import Navigation from "../Navigation";

describe("<Navigation />", () => {
  let wrapper;
  let navigationComponent;

  const onNavigatePreviousMock = jest.fn();
  const onNavigateNextMock = jest.fn();
  const onTextClickMock = jest.fn();

  const navigationTextMock = "Navigation text";

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <NavigationWrapper
          id="id1"
          onNavigatePrevious={onNavigatePreviousMock}
          onNavigateNext={onNavigateNextMock}
          onTextClick={onTextClickMock}
          navigationText={navigationTextMock}
        />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("onNavigatePrevious is triggered", () => {
    navigationComponent = wrapper.find(Navigation);

    navigationComponent
      .find(HvDropLeftIcon)
      .at(0)
      .simulate("click", {
        preventDefault() {}
      });

    expect(onNavigatePreviousMock).toBeCalled();
  });

  it("onNavigateNext is triggered", () => {
    navigationComponent = wrapper.find(Navigation);

    navigationComponent
      .find(HvDropRightIcon)
      .at(0)
      .simulate("click", {
        preventDefault() {}
      });

    expect(onNavigateNextMock).toBeCalled();
  });

  it("onTextClick is triggered", () => {
    navigationComponent = wrapper.find(Navigation);

    navigationComponent
      .find("div")
      .at(2)
      .simulate("click", {
        preventDefault() {}
      });

    expect(onTextClickMock).toBeCalled();
  });
});
