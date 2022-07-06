import React from "react";
import { mount } from "enzyme";
import { HvCard, HvCardView, HvProvider } from "../../..";
import { Main } from "../stories/CardView.stories";

describe("CardView", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvCardView)).toMatchSnapshot();
  });

  it("should render correctly with default render", () => {
    const cards = wrapper.find(HvCard);
    expect(cards.length).toEqual(10);
  });
});
