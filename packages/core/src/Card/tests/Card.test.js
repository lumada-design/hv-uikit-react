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

import HvProvider from "../../Provider";
import Card from "..";

const configuration = {
  title: "title",
  subtitle: "subtitle",
  content: <div />,
  actions: "actions",
  icon: "icon"
};

describe("Card withStyles", () => {
  let wrapper;

  it("should be able to render with every property defined", () => {
    wrapper = mount(
      <HvProvider>
        <Card
          icon={configuration.icon}
          headerTitle={configuration.title}
          subheader={configuration.subtitle}
          innerCardContent={configuration.content}
          actions={configuration.actions}
          mediaPath="path"
          isSelectable
          checkboxValue="value"
        />
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should select when clicking on the card", () => {
    const onClickActionM = jest.fn();
    const onChangeM = jest.fn();
    wrapper = mount(
      <HvProvider>
        <Card
          icon={configuration.icon}
          headerTitle={configuration.title}
          subheader={configuration.subtitle}
          innerCardContent={configuration.content}
          actions={configuration.actions}
          mediaPath="path"
          isSelectable
          selectOnClickAction
          onClickAction={onClickActionM}
          onChange={onChangeM}
          checkboxValue="value"
        />
      </HvProvider>
    );
    wrapper.find({ role: "checkbox" }).simulate("click");
    expect(onClickActionM.mock.calls.length).toBe(1);
    expect(onChangeM.mock.calls.length).toBe(1);
  });

  it("should not select when clicking on the card", () => {
    const onClickActionM = jest.fn();
    const onChangeM = jest.fn();
    wrapper = mount(
      <HvProvider>
        <Card
          icon={configuration.icon}
          headerTitle={configuration.title}
          subheader={configuration.subtitle}
          innerCardContent={configuration.content}
          actions={configuration.actions}
          mediaPath="path"
          isSelectable
          onClickAction={onClickActionM}
          onChange={onChangeM}
          checkboxValue="value"
        />
      </HvProvider>
    );
    wrapper.find({ role: "checkbox" }).simulate("click");
    expect(onClickActionM.mock.calls.length).toBe(1);
    expect(onChangeM.mock.calls.length).toBe(0);
  });
});
