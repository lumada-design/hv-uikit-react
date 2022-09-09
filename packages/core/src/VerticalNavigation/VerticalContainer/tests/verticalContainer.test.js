/* eslint-env jest */

import React from "react";
import { mount, shallow } from "enzyme";
import HvProvider from "../../../Provider";
import VerticalContainer from "..";

const Content = <div id="test_div" />;

const setupComponent = (props = {}) =>
  mount(
    <HvProvider cssBaseline="none">
      <VerticalContainer id="test" {...props}>
        {Content}
      </VerticalContainer>
    </HvProvider>
  );

describe("VerticalContainer withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider cssBaseline="none">
        <VerticalContainer>{Content}</VerticalContainer>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(VerticalContainer)).toMatchSnapshot();
  });
});

describe("VerticalContainer", () => {
  it("should render only the anchor bar", () => {
    const wrapper = setupComponent();

    const VerticalComponent = wrapper.find(VerticalContainer);
    expect(VerticalComponent.length).toBe(1);
    const AnchorBarComponent = wrapper.find("#test-anchor-bar");
    expect(AnchorBarComponent.length).toBe(1);
    const containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);
  });

  it("should render the anchor bar with vertical container", () => {
    const wrapper = setupComponent({ isOpen: true });

    const AnchorBarComponent = wrapper.find("#test-anchor-bar");
    expect(AnchorBarComponent.length).toBe(1);
    const containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);
  });

  it("should open the vertical container when anchor hamburger clicked", () => {
    const wrapper = setupComponent();

    let containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);

    const button = wrapper.find("button");
    button.at(0).simulate("click");

    containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);
  });

  it("should close the vertical container when anchor hamburger clicked", () => {
    const wrapper = setupComponent();

    let containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);

    let button = wrapper.find("button");
    button.at(0).simulate("click");

    containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);

    button = wrapper.find("button");
    button.at(0).simulate("click");

    containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);
  });

  it("should close the vertical container when anchor hamburger clicked and it was render open", () => {
    const wrapper = setupComponent({ isOpen: true });

    let containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);

    const button = wrapper.find("button");
    button.at(0).simulate("click");

    containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);
  });

  it("shouldn't render the anchor bar or the vertical container", () => {
    const wrapper = setupComponent({ isAnchorBarVisible: false });

    const AnchorBarComponent = wrapper.find("#test-anchor-bar");
    expect(AnchorBarComponent.length).toBe(0);
    const containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);
  });

  it("should render only the vertical container", () => {
    const wrapper = setupComponent({ isAnchorBarVisible: false, isOpen: true });

    const AnchorBarComponent = wrapper.find("#test-anchor-bar");
    expect(AnchorBarComponent.length).toBe(0);
    const containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);
  });
});
