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

import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import HvProvider from "@hv/uikit-react-core/dist/Provider";

import Badge from "../Badge";

describe("<Badge />", () => {
  let wrapper;
  const classes = {
    badge: "badge",
    count: "count",
    withIcon: "withIcon",
    iconContainer: "iconContainer",
    badgeBorder: "badgeBorder"
  };

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <Badge classes={classes} count={0} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render correctly with showCount", () => {
    expect(
      wrapper.props().children[1].props.children.props.children
    ).toBeFalsy();

    wrapper = shallow(
      <HvProvider>
        <Badge classes={classes} count={12} showCount />
      </HvProvider>
    );

    expect(
      shallow(wrapper.props().children[1].props.children)
        .find(".count")
        .props().children
    ).toEqual(12);
  });

  it("should render correctly with maxCount", () => {
    wrapper = shallow(
      <HvProvider>
        <Badge classes={classes} count={100} showCount />
      </HvProvider>
    );
    expect(wrapper.props().children[1].props.children.props.count).toEqual(100);
    expect(
      shallow(wrapper.props().children[1].props.children)
        .find(".count")
        .props().children
    ).toEqual("99+");
  });
});
