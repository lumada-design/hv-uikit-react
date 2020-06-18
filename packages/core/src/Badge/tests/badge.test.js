import React from "react";
import { mount, shallow } from "enzyme";
import Alert from "@hv/uikit-react-icons/dist/Alert";
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

  it("should render correctly with showCount", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={12} showCount />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("12");
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
  });
});
