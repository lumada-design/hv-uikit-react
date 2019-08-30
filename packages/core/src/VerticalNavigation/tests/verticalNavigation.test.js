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
import last from "lodash/last";
import HvProvider from "../../Provider";
import VerticalNavigationWithStyles from "../index";
import VerticalNavigation from "../VerticalNavigation";

describe("VerticalNavigation withStyles", () => {
  let wrapper;

  const data = {
    data: [
      {
        label: "A1"
      },
      {
        label: "A2"
      }
    ]
  };

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <VerticalNavigationWithStyles values={data} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Grid component", () => {
    wrapper = mount(
      <HvProvider>
        <VerticalNavigationWithStyles values={data} />
      </HvProvider>
    );

    const VerticalNavigationComponent = wrapper.find(VerticalNavigation);
    expect(VerticalNavigationComponent.length).toBe(1);
  });
});

describe("VerticalNavigation Component", () => {
  let wrapper;
  let instance;
  const data = {
    data: [
      {
        label: "A1"
      },
      {
        label: "A2",
        subData: {
          data: [
            {
              label: "B1"
            },
            {
              label: "B2"
            }
          ]
        }
      }
    ]
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <VerticalNavigationWithStyles values={data} />
      </HvProvider>
    );
  });

  it("should call onClick", () => {
    const onChangeMock = jest.fn();

    wrapper = mount(
      <HvProvider>
        <VerticalNavigationWithStyles values={data} onClick={onChangeMock} />
      </HvProvider>
    );

    const verticalNavigationComponent = wrapper.find(VerticalNavigation);

    instance = verticalNavigationComponent.instance();

    instance.onSelection(data.data[0]);

    expect(onChangeMock).toBeCalled();
  });

  it("should navigate to sub-levels", () => {
    const verticalNavigationComponent = wrapper.find(VerticalNavigation);

    instance = verticalNavigationComponent.instance();

    expect(last(instance.state.list)).toBe(data);

    instance.onSelection(data.data[1]);

    expect(last(instance.state.list)).toBe(data.data[1].subData);
    expect(last(instance.state.title)).toBe(data.data[1].label);
  });

  it("should navigate to return levels", () => {
    const verticalNavigationComponent = wrapper.find(VerticalNavigation);

    instance = verticalNavigationComponent.instance();

    expect(last(instance.state.list)).toBe(data);

    instance.onSelection(data.data[1]);

    expect(last(instance.state.list)).toBe(data.data[1].subData);
    expect(last(instance.state.title)).toBe(data.data[1].label);

    instance.onReturn();

    expect(last(instance.state.list)).toBe(data);
    expect(JSON.stringify(instance.state.title)).toBe(JSON.stringify([]));
  });

  it("should search", () => {
    const verticalNavigationComponent = wrapper.find(VerticalNavigation);

    instance = verticalNavigationComponent.instance();

    instance.handleSearch("1");

    expect(last(instance.state.list).data[0].isHidden).toBe(false);
    expect(last(instance.state.list).data[1].isHidden).toBe(true);
  });
});
