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

import HvProvider from "@hv/uikit-react-core/dist/Provider";
import toJson from "enzyme-to-json";
import ListItemWithStyles from "../index";
import ListItem from "../ListItem";

const configuration = {
  title: "title",
  subtitle: "subtitle",
  content: "content",
  actions: "actions",
  icon: "icon"
};

describe("ListItem withStyles", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = shallow(
      <HvProvider>
        <ListItemWithStyles
          classes={{}}
          avatar={configuration.icon}
          title={configuration.title}
          subtitle={configuration.subtitle}
          innerItemContent={configuration.content}
          actions={configuration.actions}
          semantic="sema1"
          isSelectable
          checkboxValue="value"
        />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render the ListItem component", () => {
    const ListItemComponent = wrapper.find(ListItemWithStyles);
    expect(ListItemComponent.length).toBe(1);
  });

  it("should be able to render with every property defined", () => {
    wrapper = mount(
      <HvProvider>
        <ListItemWithStyles
          classes={{}}
          avatar={configuration.icon}
          title={configuration.title}
          subtitle={configuration.subtitle}
          innerItemContent={configuration.content}
          actions={configuration.actions}
          mediaPath="path"
          semantic="sema1"
          isSelectable
          checkboxValue="value"
        />
      </HvProvider>
    );
    const ListItemComponent = wrapper.find(ListItem);
    expect(ListItemComponent.length).toBe(1);
  });
});
