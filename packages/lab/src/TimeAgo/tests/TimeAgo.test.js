/* eslint-env jest */

import React from "react";
import { render } from "@testing-library/react";
import { HvButton, HvProvider } from "@hv/uikit-react-core";
import { HvTimeAgo } from "../..";

const EM_DASH = "—";

const MOCK_TIME_AGO = "MOCK_TIME_AGO";
const MOCK_DELAY = 120;

jest.mock("../formatUtils", () => ({
  formatTimeAgo: jest.fn(() => ({ timeAgo: MOCK_TIME_AGO, delay: MOCK_DELAY })),
}));

describe("TimeAgo without timestamp", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = render(
      <HvProvider>
        <HvTimeAgo />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render the emptyElement", () => {
    wrapper = render(
      <HvProvider>
        <HvTimeAgo />
      </HvProvider>
    );

    const component = wrapper.getByText(EM_DASH);
    expect(component).toBeVisible();
  });

  it("should render the custom emptyElement", () => {
    const MOCK_EMPTY = "EMPTY";
    wrapper = render(
      <HvProvider>
        <HvTimeAgo emptyElement={MOCK_EMPTY} />
      </HvProvider>
    );

    const component = wrapper.getByText(MOCK_EMPTY);
    expect(component).toBeVisible();
  });
});

describe("TimeAgo with timestamp", () => {
  const timestamp = Date.now();
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <HvProvider>
        <HvTimeAgo timestamp={timestamp} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper.container).toBeDefined();
  });

  it("should contain the relative time", () => {
    const component = wrapper.getByText("MOCK_TIME_AGO");
    expect(component).toBeVisible();
  });
});

describe("TimeAgo with custom Button element", () => {
  const timestamp = Date.now();
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <HvProvider>
        <HvTimeAgo timestamp={timestamp} component={HvButton} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper.container).toBeDefined();
  });

  it("should render the Button", () => {
    const component = wrapper.getByRole("button");
    expect(component).toBeVisible();
  });
});
