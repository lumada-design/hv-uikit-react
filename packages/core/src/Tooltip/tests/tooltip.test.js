/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvProvider, HvTooltip, HvTypography } from "../..";

const createTitle = (data) => (
  <div>
    <HvTypography variant="highlightText">{data.title || ""}</HvTypography>
    {data.elements.map((element) => (
      <div key={element.name}>
        <HvTypography variant="highlightText">{element.name}</HvTypography>
        <div />
        <HvTypography>{element.value}</HvTypography>
      </div>
    ))}
  </div>
);

const Anchor = (
  <button id="testChild" type="submit">
    Hello World
  </button>
);

describe("Single Line Tooltip", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <HvTooltip title={<HvTypography variant="highlightText">Grid View</HvTypography>}>
          {Anchor}
        </HvTooltip>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render single line tooltip correctly", () => {
    expect(wrapper.find(HvTooltip)).toMatchSnapshot();
  });

  it("should render the single line Tooltip", () => {
    const tooltip = wrapper.find(HvTooltip);
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
      { name: "Approval", value: "Not yet requested" },
    ],
  };

  const title = createTitle(data);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <HvTooltip title={title} useSingle={false}>
          {Anchor}
        </HvTooltip>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render multiple line tooltip correctly", () => {
    expect(wrapper.find(HvTooltip)).toMatchSnapshot();
  });

  it("should render the multiple line Tooltip", () => {
    const tooltip = wrapper.find(HvTooltip);
    expect(tooltip.length).toBe(1);
  });
});

describe("Multi Line Tooltip - With Header", () => {
  let wrapper;

  const data = {
    title: "January",
    elements: [
      { name: "Sales", value: "52,000 units" },
      { name: "Profit", value: "50%" },
    ],
  };

  const title = createTitle(data);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <HvTooltip title={title} useSingle={false}>
          {Anchor}
        </HvTooltip>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render multiple line tooltip with header correctly", () => {
    expect(wrapper.find(HvTooltip)).toMatchSnapshot();
  });

  it("should render the multiple line Tooltip with header", () => {
    const tooltip = wrapper.find(HvTooltip);
    expect(tooltip.length).toBe(1);
  });
});
