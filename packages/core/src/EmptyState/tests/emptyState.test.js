/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvEmptyState, HvProvider } from "../..";
import { CustomMessages } from "../stories/EmptyState.stories";

describe("[v3] <HvEmptyState /> with String title/message", () => {
  const wrapper = mount(
    <HvProvider>
      <CustomMessages />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvEmptyState)).toMatchSnapshot();
  });
});

describe("[v3] <EmptyState /> with Element title/message/action", () => {
  const MockTitle = () => <div>mockTitle</div>;
  const MockMessage = () => <div>mockMessage</div>;
  const MockAction = () => <div>mockAction</div>;

  const wrapper = mount(
    <HvProvider>
      <HvEmptyState
        title={<MockTitle />}
        message={<MockMessage />}
        action={<MockAction />}
        icon={<div />}
      />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvEmptyState)).toMatchSnapshot();
  });

  it("should contain the title Element", () => {
    expect(wrapper.contains(<MockTitle />)).toBe(true);
  });

  it("should contain the message Element", () => {
    expect(wrapper.contains(<MockMessage />)).toBe(true);
  });

  it("should contain the action", () => {
    expect(wrapper.contains(<MockAction />)).toBe(true);
  });
});
