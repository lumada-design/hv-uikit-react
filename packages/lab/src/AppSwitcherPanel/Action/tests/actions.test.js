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
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { Info, Tool } from "@hitachivantara/uikit-react-icons";

import ActionWrapper from "../index";

describe("<Action /> with description", () => {
  let wrapper;

  const mockApplications = {
    id: "app-1",
    name: "Mock App 1",
    iconUrl: "http://mockapp1/icon",
    description: "Mock App 1 Description",
    url: "http://mockapp1/",
    target: "_top",
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <ActionWrapper key="mockKey" application={mockApplications} />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(ActionWrapper)).toMatchSnapshot();
  });

  it("should render a link element", () => {
    expect(wrapper.find("a").length).toBe(1);
  });

  it("should render an img element", () => {
    expect(wrapper.find("img").length).toBe(1);
  });

  it("should render a Info icon component", () => {
    expect(wrapper.find(Info).length).toBe(1);
  });
});

describe("<Action /> without description", () => {
  let wrapper;

  const mockApplications = {
    id: "app-1",
    name: "Mock App 1",
    iconUrl: "http://mockapp1/icon",
    url: "http://mockapp1/",
    target: "_top",
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <ActionWrapper key="mockKey" application={mockApplications} />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(ActionWrapper)).toMatchSnapshot();
  });

  it("should render a link element", () => {
    expect(wrapper.find("a").length).toBe(1);
  });

  it("should render an img element", () => {
    expect(wrapper.find("img").length).toBe(1);
  });

  it("should render a Info icon component", () => {
    expect(wrapper.find(Info).length).toBe(0);
  });
});

describe("<Action /> with an element icon", () => {
  let wrapper;

  const mockApplications = {
    id: "app-1",
    name: "Mock App 1",
    iconElement: <Tool />,
    url: "http://mockapp1/",
    target: "_top",
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <ActionWrapper key="mockKey" application={mockApplications} />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(ActionWrapper)).toMatchSnapshot();
  });

  it("should render a link element", () => {
    expect(wrapper.find("a").length).toBe(1);
  });

  it("should not render an img element", () => {
    expect(wrapper.find("img").length).toBe(0);
  });

  it("should render a Info icon component", () => {
    expect(wrapper.find(Info).length).toBe(0);
  });

  it("should render a Tool icon component", () => {
    expect(wrapper.find(Tool).length).toBe(1);
  });
});
