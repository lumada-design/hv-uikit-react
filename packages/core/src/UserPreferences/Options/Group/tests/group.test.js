/* eslint-env jest */

import React from "react";
import { mount, shallow } from "enzyme";
import HvProvider from "../../../../Provider";
import Group from "../index";

describe("Group withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider cssBaseline={false}>
        <Group>
          <div />
        </Group>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Group).length).toBe(1);
  });

  it("should render the label", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <Group id="test" label="hello">
          <div />
        </Group>
      </HvProvider>
    );
    const label = wrapper.find("div").find("#test-grouplabel");
    expect(label.length).toBe(1);
  });
});
