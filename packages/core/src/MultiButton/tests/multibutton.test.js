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

import Map from "@hv/uikit-react-icons/dist/Generic/Map";
import LocationPin from "@hv/uikit-react-icons/dist/Generic/LocationPin";
import HvProvider from "../../Provider";
import MultiButton from "..";

const buttonsDefinitions = [
  { id: "map", value: "map", icon: <Map />, selected: true },
  { id: "satellite", value: "satellite", icon: <LocationPin /> },
  { id: "map1", value: "map1", icon: <Map /> },
  { id: "satellite1", value: "satellite1", icon: <LocationPin /> }
];

describe("Multibutton withStyles - Icons Only", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <HvProvider>
          <MultiButton buttons={buttonsDefinitions} type="icon" multi />
        </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find("MultiButton");
    expect(multiButtonComponent.length).toBe(1);
  });

  it("should render the inner buttons and match to definitions", () => {
    const multiButtonComponent = wrapper.find("MultiButton");
    expect(multiButtonComponent.length).toBe(1);
  });
});

describe("Multibutton - Text Only", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <HvProvider>
          <MultiButton buttons={buttonsDefinitions} type="text" multi />
        </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find("MultiButton");
    expect(multiButtonComponent.length).toBe(1);
  });
});

describe("Multibutton - Text and Icons", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <HvProvider>
          <MultiButton buttons={buttonsDefinitions} type="mixed" multi />
        </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find("MultiButton");
    expect(multiButtonComponent.length).toBe(1);
  });
});
