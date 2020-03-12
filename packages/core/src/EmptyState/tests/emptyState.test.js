/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import HvProvider from "../../Provider";
import EmptyState from "..";

const mockClasses = {};
const mockTitle = "mockTitle";
const mockMessage = "mockMessage";
const mockIcon = <div />;

describe("<EmptyState /> with String title/message", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <EmptyState classes={mockClasses} title={mockTitle} message={mockMessage} icon={mockIcon} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<EmptyState /> with Element title/message/action", () => {
  let wrapper;
  const MockTitle = () => <div>{mockTitle}</div>;
  const MockMessage = () => <div>{mockMessage}</div>;
  const MockAction = () => <div>mockAction</div>;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <EmptyState
          title={<MockTitle />}
          message={<MockMessage />}
          action={<MockAction />}
          icon={mockIcon}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
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
