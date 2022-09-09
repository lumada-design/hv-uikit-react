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
      <HvProvider cssBaseline="none">
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
      <HvProvider cssBaseline="none">
        <Badge count={12} />
      </HvProvider>
    );
    const divs = wrapper.find(`div[className^="HvBadge-root"]`);

    expect(divs.find(`div[className*="HvBadge-badge"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-badge"]`).text()).toEqual("");
    expect(divs.find(`div[className*="HvBadge-showCount"]`)).toHaveLength(0);
    expect(divs.find(`div[className*="HvBadge-showLabel"]`)).toHaveLength(0);
    expect(divs.find(`div[className*="HvBadge-badgeOneDigit"]`)).toHaveLength(0);
  });

  it("should render correctly with showCount", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge count={12} showCount />
      </HvProvider>
    );

    const divs = wrapper.find(`div[className^="HvBadge-root"]`);
    expect(divs.find(`div[className*="HvBadge-badge"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showCount"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showCount"]`).text()).toEqual("12");
    expect(divs.find(`div[className*="HvBadge-showLabel"]`)).toHaveLength(0);
    expect(divs.find(`div[className*="HvBadge-badgeOneDigit"]`)).toHaveLength(0);
  });

  it("should render correctly with showCount and one-digit count", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge count={9} showCount />
      </HvProvider>
    );
    const divs = wrapper.find(`div[className^="HvBadge-root"]`);

    expect(divs.find(`div[className*="HvBadge-badge"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showCount"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showCount"]`).text()).toEqual("9");
    expect(divs.find(`div[className*="HvBadge-showLabel"]`)).toHaveLength(0);
    expect(divs.find(`div[className*="HvBadge-badgeOneDigit"]`)).toHaveLength(1);
  });

  it("should render nothing when count is 0 even with showCount", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge count={0} showCount />
      </HvProvider>
    );
    const divs = wrapper.find(`div[className^="HvBadge-root"]`);

    expect(divs.find(`div[className*="HvBadge-badge"]`).length).toBe(0);
    expect(divs.find(`div > div > div`).text()).toEqual("");
    expect(divs.find(`div[className*="HvBadge-showCount"]`).length).toBe(0);
    expect(divs.find(`div[className*="HvBadge-showLabel"]`).length).toBe(0);
    expect(divs.find(`div[className*="HvBadge-badgeOneDigit"]`)).toHaveLength(0);
  });

  it("should render correctly with maxCount", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge count={100} showCount />
      </HvProvider>
    );

    const divs = wrapper.find(`div[className^="HvBadge-root"]`);
    expect(divs.find(`div[className*="HvBadge-showCount"]`).text()).toEqual("99+");
  });

  it("should render correctly with text", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge count={100} showCount text="hello" textVariant="sTitle" />
      </HvProvider>
    );

    const text = wrapper.find(Typography);
    expect(text.length).toEqual(1);

    const divs = wrapper.find(`div[className^="HvBadge-root"]`);
    expect(divs.find(`div[className*="HvBadge-showCount"]`).text()).toEqual("99+");
  });

  it("should render correctly with svg", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge count={100} showCount icon={<Alert />} />
      </HvProvider>
    );

    const icon = wrapper.find(Alert);
    expect(icon.length).toEqual(1);

    const divs = wrapper.find(`div[className^="HvBadge-root"]`);
    expect(divs.find(`div[className*="HvBadge-showCount"]`).text()).toEqual("99+");
  });

  it("should render correctly with custom label", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge label="New!" />
      </HvProvider>
    );
    const divs = wrapper.find(`div[className^="HvBadge-root"]`);

    expect(divs.find(`div[className*="HvBadge-badge"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showCount"]`)).toHaveLength(0);
    expect(divs.find(`div[className*="HvBadge-showLabel"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showLabel"]`).text()).toEqual("New!");
    expect(divs.find(`div[className*="HvBadge-badgeOneDigit"]`)).toHaveLength(0);
  });

  it("should render correctly with custom one-character label", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge label="!" />
      </HvProvider>
    );
    const divs = wrapper.find(`div[className^="HvBadge-root"]`);

    expect(divs.find(`div[className*="HvBadge-badge"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showCount"]`)).toHaveLength(0);
    expect(divs.find(`div[className*="HvBadge-showLabel"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showLabel"]`).text()).toEqual("!");
    expect(divs.find(`div[className*="HvBadge-badgeOneDigit"]`)).toHaveLength(1);
  });

  it("should render custom label but not count when both are specified", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Badge label="New!" count={23} showCount />
      </HvProvider>
    );
    const divs = wrapper.find(`div[className^="HvBadge-root"]`);

    expect(divs.find(`div[className*="HvBadge-badge"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showCount"]`)).toHaveLength(0); // not to exist
    expect(divs.find(`div[className*="HvBadge-showLabel"]`)).toHaveLength(1);
    expect(divs.find(`div[className*="HvBadge-showLabel"]`).text()).toEqual("New!"); // not to be "23"
    expect(divs.find(`div[className*="HvBadge-badgeOneDigit"]`)).toHaveLength(0);
  });
});
