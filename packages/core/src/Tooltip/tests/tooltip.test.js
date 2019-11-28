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

import TooltipWithStyles from "..";
import Tooltip from "../Tooltip";
import HvProvider from "../../Provider";

describe("Single Line Tooltip", () => {
  let wrapper;

  const data = {
    title: "Grid view"
  };

  const defaultProps = {
    children: (
      <button id="testChild" type="submit">
        Hello World
      </button>
    )
  };
  beforeEach(async () => {
    wrapper = mount(
      <Tooltip tooltipData={data} tooltipAnchor={defaultProps.children} />
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render single line tooltip correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the single line Tooltip", () => {
    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.length).toBe(1);
  });
});

describe("Multi Line Tooltip - No Header", () => {
  let wrapper;

  const data = {
    elements: [
      {
        name: "Status",
        value: "Open"
      },
      {
        name: "Date",
        value: "12/08/2018"
      },
      {
        name: "Assignee",
        value: "Management"
      },
      {
        name: "Approval",
        value: "Not yet requested"
      }
    ]
  };

  const defaultProps = {
    children: (
      <button id="testChild" type="submit">
        Hello World
      </button>
    )
  };
  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <TooltipWithStyles
          tooltipData={data}
          tooltipAnchor={defaultProps.children}
          useSingle={false}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render mmultiple line tooltip correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the multiple line Tooltip", () => {
    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.length).toBe(1);
  });
});

describe("Multi Line Tooltip - With Header", () => {
  let wrapper;

  const data = {
    title: "January",
    elements: [
      {
        name: "Sales",
        value: "52,000 units"
      },
      {
        name: "Profit",
        value: "50%"
      }
    ]
  };

  const defaultProps = {
    children: (
      <button id="testChild" type="submit">
        Hello World
      </button>
    )
  };
  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <TooltipWithStyles
          tooltipData={data}
          tooltipAnchor={defaultProps.children}
          useSingle={false}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render multiple line tooltip with header correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the multiple line Tooltip with header", () => {
    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.length).toBe(1);
  });
});
