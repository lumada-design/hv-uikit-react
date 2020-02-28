/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";

import SwitchWithStyles from "..";

let wrapper;

// TODO - Improve Test Structure

describe("Switch withStyles", () => {
  wrapper = mount(
    <HvProvider>
      <SwitchWithStyles />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Switch with Custom Configurations", () => {
  wrapper = mount(
    <HvProvider>
      <SwitchWithStyles
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
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Switch with no label display but with custom label configuration", () => {
  wrapper = mount(
    <HvProvider>
      <SwitchWithStyles
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
    expect(wrapper).toMatchSnapshot();
  });
});
// TODO - test that labels are not clickable when not visible
// TODO - test that labels are not clickable when element is disabled
describe("Switch label click", () => {
  wrapper = mount(
    <HvProvider>
      <SwitchWithStyles
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

  const clickableLabel = wrapper.find("#hvswitch_leftButton");
  clickableLabel.simulate("click", {
    target: { classname: "labelDeselected" }
  });

  it("label can be clicked", () => {
    // expect(clickableLabel).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
describe("Switch input area hover", () => {
  wrapper = mount(
    <HvProvider>
      <SwitchWithStyles
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
    expect(wrapper).toMatchSnapshot();
  });

  inputArea.simulate("mouseout");

  it("input can be hovered out", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
