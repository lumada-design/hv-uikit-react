import React from "react";
import { mount } from "enzyme";
import { HvCard, HvProvider } from "../../..";
import { Main, DefaultRender, CustomRender } from "../stories/CardView.stories";

describe("CardView", () => {
  let wrapper = mount(
    <HvProvider>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find("CardView")).toMatchSnapshot();
  });

  it("should render correctly with default render", () => {
    wrapper = mount(
      <HvProvider>
        <DefaultRender />
      </HvProvider>
    );
    const cards = wrapper.find(HvCard);
    expect(cards.length).toEqual(10);
  });

  it("should render correctly with custom render", () => {
    wrapper = mount(
      <HvProvider>
        <CustomRender />
      </HvProvider>
    );
    const cards = wrapper.find(HvCard);
    expect(cards.length).toEqual(10);
  });
});
