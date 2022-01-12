import React from "react";
import { mount, shallow } from "enzyme";
import { Alert } from "@hitachivantara/uikit-react-icons";
import HvProvider from "../../Provider";
import Typography from "../../Typography";
import Badge from "../index";

describe("Badge ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <Badge count={0} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Badge)).toMatchSnapshot();
  });

  it("should render a small dot when count>0 without showCount", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={12} />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("");
    expect(divs.find("div.HvBadge-badge")).toHaveLength(1);
    expect(divs.find("div.HvBadge-showCount")).toHaveLength(0);
    expect(divs.find("div.HvBadge-showLabel")).toHaveLength(0);
    expect(divs.find("div.HvBadge-badgeOneDigit")).toHaveLength(0);
  });

  it("should render correctly with showCount", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={12} showCount />
      </HvProvider>
    );

    const divs = wrapper.find("div");
    expect(divs.at(1).text()).toEqual("12");
    expect(divs.find("div.HvBadge-badge")).toHaveLength(1);
    expect(divs.find("div.HvBadge-showCount")).toHaveLength(1);
    expect(divs.find("div.HvBadge-showLabel")).toHaveLength(0);
    expect(divs.find("div.HvBadge-badgeOneDigit")).toHaveLength(0);
  });

  it("should render correctly with showCount and one-digit count", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={9} showCount />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("9");
    expect(divs.find("div.HvBadge-badge")).toHaveLength(1);
    expect(divs.find("div.HvBadge-showCount")).toHaveLength(1);
    expect(divs.find("div.HvBadge-showLabel")).toHaveLength(0);
    expect(divs.find("div.HvBadge-badgeOneDigit")).toHaveLength(1);
  });

  it("should render nothing when count is 0 even with showCount", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={0} showCount />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("");
    expect(divs.find("div.HvBadge-badge").length).toBe(0);
    expect(divs.find("div.HvBadge-showCount").length).toBe(0);
    expect(divs.find("div.HvBadge-showLabel").length).toBe(0);
    expect(divs.find("div.HvBadge-badgeOneDigit")).toHaveLength(0);
  });

  it("should render correctly with maxCount", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={100} showCount />
      </HvProvider>
    );

    const divs = wrapper.find("div");
    expect(divs.at(1).text()).toEqual("99+");
  });

  it("should render correctly with text", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={100} showCount text="hello" textVariant="sTitle" />
      </HvProvider>
    );

    const text = wrapper.find(Typography);
    expect(text.length).toEqual(1);

    const divs = wrapper.find("div");
    expect(divs.at(1).text()).toEqual("99+");
  });

  it("should render correctly with svg", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={100} showCount icon={<Alert />} />
      </HvProvider>
    );

    const icon = wrapper.find(Alert);
    expect(icon.length).toEqual(1);

    const divs = wrapper.find("div");
    expect(divs.at(2).text()).toEqual("99+");
  });

  it("should render correctly with custom label", () => {
    wrapper = mount(
      <HvProvider>
        <Badge label="New!" />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("New!");
    expect(divs.find("div.HvBadge-badge")).toHaveLength(1);
    expect(divs.find("div.HvBadge-showCount")).toHaveLength(0);
    expect(divs.find("div.HvBadge-showLabel")).toHaveLength(1);
    expect(divs.find("div.HvBadge-badgeOneDigit")).toHaveLength(0);
  });

  it("should render correctly with custom one-character label", () => {
    wrapper = mount(
      <HvProvider>
        <Badge label="!" />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("!");
    expect(divs.find("div.HvBadge-badge")).toHaveLength(1);
    expect(divs.find("div.HvBadge-showCount")).toHaveLength(0);
    expect(divs.find("div.HvBadge-showLabel")).toHaveLength(1);
    expect(divs.find("div.HvBadge-badgeOneDigit")).toHaveLength(1);
  });

  it("should render custom label but not count when both are specified", () => {
    wrapper = mount(
      <HvProvider>
        <Badge label="New!" count={23} showCount />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("New!"); // not to be "23"
    expect(divs.find("div.HvBadge-badge")).toHaveLength(1);
    expect(divs.find("div.HvBadge-showCount")).toHaveLength(0); // not to exist
    expect(divs.find("div.HvBadge-showLabel")).toHaveLength(1);
    expect(divs.find("div.HvBadge-badgeOneDigit")).toHaveLength(0);
  });
});
