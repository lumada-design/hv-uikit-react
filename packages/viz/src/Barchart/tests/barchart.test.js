/* eslint-env jest */

import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { HvBarchart } from "../..";
import { Main } from "../stories/Barchart.stories";

const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};

describe("Barchart", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );

    waitForComponentToPaint(wrapper);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvBarchart)).toMatchSnapshot();
  });
});
