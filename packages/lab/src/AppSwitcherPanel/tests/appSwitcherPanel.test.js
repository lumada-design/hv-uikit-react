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

import HvProvider from "@hv/uikit-react-core/dist/Provider";
import { Info } from "@hv/uikit-react-icons/dist/Generic";

import Action from "../Action";

import AppSwitcherPanelWithStyles from "../index";
import AppSwitcherPanel from "../AppSwitcherPanel";

describe("<AppSwitcherPanel /> with minimum configuration", () => {
  let wrapper;
  let appSwitcherPanelComponent;

  const mockAppSwitcherPanelProps = {
    isOpen: true,
    title: "Mock title",
    applications: [
      {
        name: "Mock App 1",
        iconUrl: "http://mockapp1/icon",
        url: "http://mockapp1/",
        target: "_top",
      },
      {
        name: "Mock App 2",
        iconUrl: "http://mockapp2/icon",
        description: "Mock App 2 Description",
        url: "http://mockapp2/",
        target: "_blank",
      },
      {
        name: "Mock App 3",
        iconUrl: "http://mockapp2/icon",
        description: "Mock App 2 Description",
        url: "http://mockapp2/",
      },
    ],
    footer: undefined,
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <AppSwitcherPanelWithStyles {...mockAppSwitcherPanelProps} />
      </HvProvider>
    );
    appSwitcherPanelComponent = wrapper.find(AppSwitcherPanel);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render 3 action components", () => {
    expect(appSwitcherPanelComponent.find(Action).length).toBe(3);
  });

  it("should have 2 Info icons rendered", () => {
    expect(appSwitcherPanelComponent.find(Info).length).toBe(2);
  });
});

describe("<AppSwitcherPanel /> Applications without a name or url should not be renderered", () => {
  let wrapper;
  let appSwitcherPanelComponent;

  const mockAppSwitcherPanelProps = {
    isOpen: true,
    title: "Mock title",
    applications: [
      {
        name: "Mock App 1 - VALID",
        iconUrl: "http://mockapp1/icon",
        description: "Mock App 1 Description",
        url: "http://mockapp1/",
        target: "_top"
      },
      {
        iconUrl: "http://mockapp2/icon",
        description: "Mock App 2 Description",
        url: "http://mockapp2/",
        target: "_blank"
      },
      {
        name: "Mock App 3",
        iconUrl: "http://mockapp3/icon",
        description: "Mock App 3 Description"
      },
      {
        iconUrl: "http://mockapp4/icon",
        description: "Mock App 4 Description"
      },
      {
        name: "Mock App 5 - VALID without description",
        iconUrl: "http://mockapp5/icon",
        url: "http://mockapp5/"
      }
    ],
    footer: undefined
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <AppSwitcherPanelWithStyles {...mockAppSwitcherPanelProps} />
      </HvProvider>
    );
    appSwitcherPanelComponent = wrapper.find(AppSwitcherPanel);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render 2 action components", () => {
    expect(appSwitcherPanelComponent.find(Action).length).toBe(2);
  });

  it("should have 1 Info icons rendered", () => {
    expect(appSwitcherPanelComponent.find(Info).length).toBe(1);
  });
});
