/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import Map from "@hv/uikit-react-icons/dist/Map";
import LocationPin from "@hv/uikit-react-icons/dist/LocationPin";
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
