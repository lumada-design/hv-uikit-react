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
import { mount, shallow } from "enzyme";

import HvProvider from "../../Provider";
import CardWithStyles from "../index";
import Card from "../Main";

const configuration = {
  title: "title",
  subtitle: "subtitle",
  content: "content",
  actions: "actions",
  icon: "icon"
};

describe("Card withStyles", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = shallow(
      <HvProvider>
        <CardWithStyles
          Icon={configuration.icon}
          HeaderTitle={configuration.title}
          Subheader={configuration.subtitle}
          InnerCardContent={configuration.content}
          Actions={configuration.actions}
          variant="error"
          isSelectable
          checkboxValue="value"
        />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Card component", () => {
    const CardComponent = wrapper.find(Card);
    expect(CardComponent.length).toBe(1);
  });

  it("should be able to render with every property defined", () => {
    wrapper = mount(
      <HvProvider>
        <CardWithStyles
          Icon={configuration.icon}
          HeaderTitle={configuration.title}
          Subheader={configuration.subtitle}
          InnerCardContent={configuration.content}
          Actions={configuration.actions}
          mediaPath="path"
          variant="error"
          isSelectable
          checkboxValue="value"
        />
      </HvProvider>
    );
    const CardComponent = wrapper.find(Card);
    expect(CardComponent.length).toBe(1);
  });
});
