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
import { shallow, mount } from "enzyme";
import HvProvider from "../../Provider";
import EmptyState from "../EmptyState";
import StyledEmptyState from "../index";

const mockClasses = {};
const mockTitle = "mockTitle";
const mockMessage = "mockMessage";
const mockIcon = <div />;

describe("<EmptyState /> with String title/message", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <EmptyState
        classes={mockClasses}
        title={mockTitle}
        message={mockMessage}
        icon={mockIcon}
      />
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
        <StyledEmptyState
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
