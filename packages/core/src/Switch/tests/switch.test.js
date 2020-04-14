/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import Switch from "..";

let wrapper;

// TODO - Improve Test Structure

describe("Switch withStyles", () => {
  wrapper = mount(
    <HvProvider>
      <Switch />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Switch)).toMatchSnapshot();
  });
});

describe("Switch with Custom Configurations", () => {
  wrapper = mount(
    <HvProvider>
      <Switch
        checked={false}
        disabled={false}
        showLabels
        labels={{
          left: "Left",
          right: "Right"
        }}
      />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Switch)).toMatchSnapshot();
  });
});

describe("Switch with no label display but with custom label configuration", () => {
  wrapper = mount(
    <HvProvider>
      <Switch
        checked
        disabled
        showLabels={false}
        labels={{
          left: "Left",
          right: "Right"
        }}
      />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Switch)).toMatchSnapshot();
  });
});
// TODO - test that labels are not clickable when not visible
// TODO - test that labels are not clickable when element is disabled
describe("Switch label click", () => {
  wrapper = mount(
    <HvProvider>
      <Switch
        id="hvswitch"
        checked={false}
        showLabels
        labels={{
          left: "Left",
          right: "Right"
        }}
        displayIconChecked={false}
      />
    </HvProvider>
  );

  const clickableLabel = wrapper.find("#hvswitch-left-button");
  clickableLabel.simulate("click", {
    target: { classname: "labelDeselected" }
  });

  it("label can be clicked", () => {
    // expect(clickableLabel).toHaveBeenCalled();
    expect(wrapper.find(Switch)).toMatchSnapshot();
  });
});
describe("Switch input area hover", () => {
  wrapper = mount(
    <HvProvider>
      <Switch
        checked={false}
        classes={{}}
        showLabels
        labels={{
          left: "Left",
          right: "Right"
        }}
      />
    </HvProvider>
  );

  const inputArea = wrapper.find("input");
  inputArea.simulate("mouseover");

  it("input can be hovered in", () => {
    expect(wrapper.find(Switch)).toMatchSnapshot();
  });

  inputArea.simulate("mouseout");

  it("input can be hovered out", () => {
    expect(wrapper.find(Switch)).toMatchSnapshot();
  });
});
