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
import toJson from "enzyme-to-json";

import ListItem from "@material-ui/core/ListItem";
import HvProvider from "@hv/uikit-react-core/dist/dist/Provider";

import NavigationAnchorsWithStyles from "../index";
import NavigationAnchors from "../NavigationAnchors";

describe("User withStyles", () => {
  let wrapper;

  const options = [
    {
      label: "Option1",
      value: "Value1"
    },
    {
      label: "Option2",
      value: "Value2"
    },
    {
      label: "Option3",
      value: "Value3"
    }
  ];

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <NavigationAnchorsWithStyles classes={{}} options={options} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render correctly with props", () => {
    wrapper = mount(
      <HvProvider>
        <NavigationAnchors classes={{}} options={options} />
      </HvProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should handle click action correctly", () => {
    const onClick = jest.fn();
    const onClickCallback = () => onClick();
    let listItems;

    wrapper = mount(
      <HvProvider>
        <NavigationAnchors
          classes={{}}
          options={options}
          onClick={onClickCallback}
        />
      </HvProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();

    listItems = wrapper.find(ListItem);
    listItems.first().simulate("click");
    expect(onClick).not.toHaveBeenCalled();

    wrapper = mount(
      <NavigationAnchors
        classes={{}}
        href={false}
        options={options}
        onClick={onClickCallback}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();

    listItems = wrapper.find(ListItem);
    listItems.first().simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
