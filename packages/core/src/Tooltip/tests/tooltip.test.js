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
import withStyles from "@material-ui/core/styles/withStyles";

import Tooltip from "..";
import HvProvider from "../../Provider";
import HvTypography from "../../Typography";
import tooltipStyling from "../styles";

const createTooltipData = data => {
  // eslint-disable-next-line react/prop-types
  const TooltipContent = ({ classes }) => (
    <div>
      <div className={classes.title}>
        <HvTypography variant="labelText">{data.title || ""}</HvTypography>
      </div>
      <div className={classes.valueWrapper}>
        {data.elements.map(element => (
          <div key={element.name} className={classes.values}>
            <HvTypography variant="labelText">{element.name}</HvTypography>
            <div className={classes.separator} />
            <HvTypography variant="sText">{element.value}</HvTypography>
          </div>
        ))}
      </div>
    </div>
  );

  return withStyles(tooltipStyling, {
    withTheme: true
  })(TooltipContent);
};

const Anchor = (
  <button id="testChild" type="submit">
    Hello World
  </button>
);

describe("Single Line Tooltip", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Tooltip
          tooltipData={
            <HvTypography variant="labelText">Grid View</HvTypography>
          }
          tooltipAnchor={Anchor}
        />
      </HvProvider>
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
      { name: "Status", value: "Open" },
      { name: "Date", value: "12/08/2018" },
      { name: "Assignee", value: "Management" },
      { name: "Approval", value: "Not yet requested" }
    ]
  };

  const TooltipData = createTooltipData(data);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Tooltip
          tooltipData={<TooltipData />}
          tooltipAnchor={Anchor}
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
      { name: "Sales", value: "52,000 units" },
      { name: "Profit", value: "50%" }
    ]
  };

  const TooltipData = createTooltipData(data);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Tooltip
          tooltipData={<TooltipData />}
          tooltipAnchor={Anchor}
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
