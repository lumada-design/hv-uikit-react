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
import { HeaderWithStyles } from "../index";
import Main from "../Header";
import HvProvider from "../../Provider";


window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
}));

describe("Header withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<HeaderWithStyles />);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Main component", () => {
    const mainComponent = wrapper.find(Main);
    expect(mainComponent.length).toBe(1);
  });

  it("should render the internal component", () => {

    const navigationData = {
      showSearch: false,
      data: [
        {
          label: "Analytics",
          leftIcon: <div />,
          path: "/Analytics",
          subData: {
            data: [
              {
                label: "Model Effectiveness",
                leftIcon: <div />,
                path: "/meffectiveness"
              },
              {
                label: "Trend Analysis",
                leftIcon: <div />,
                path: "/tAnalysis"
              }
            ]
          }
        }
      ]
    };
    
    const actionValues = [
      {
        label: "Profile",
        leftIcon: <div />,
        horizontalItemAction:<div />,
        onVerticalClick: () => {},
        path: "route3"
      }
    ];
  
    wrapper = mount(
      <HvProvider>
        <HeaderWithStyles
          label="Maintenance Insights"
          // Navigation
          navigationStructure={navigationData}
          labels={{}}
          selected={0}
          // Actions
          actionValues={actionValues}
        />
      </HvProvider>
    );
    const brandComponent = wrapper.exists("Brand");
    const actionsComponent = wrapper.exists("Actions");

    expect(brandComponent).toBeTruthy();
    expect(actionsComponent).toBeTruthy();
  });
});
