/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import Play from "@hv/uikit-react-icons/dist/Generic/Play";
import HvProvider from "../../../Provider";

import Navigation from "../index";

describe("<Navigation />", () => {
  const onChangeMock = jest.fn();

  let wrapper;

  const navigationData = [
    {
      id: "01",
      label: "System",
      icon: <Play />,
      children: [
        {
          id: "01-01",
          label: "SCPodF",
          children: [
            {
              id: "01-01-01",
              label: "Compute"
            },
            {
              id: "01-01-02",
              label: "Storage"
            },
            {
              id: "01-01-03",
              label: "Ethernet"
            },
            {
              id: "01-01-04",
              label: "Fiber Channel",
              payload: { path: "/hello/world", params: { a: 2, b: "3" } }
            }
          ]
        }
      ]
    }
  ];

  describe("navigation", () => {

    const value = "01-01";

    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <Navigation
            label="Example 1 navigation"
            selected={value}
            onChange={onChangeMock}
            data={navigationData}
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
