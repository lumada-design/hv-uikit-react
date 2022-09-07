/* eslint-env jest */

import React from "react";
import { render } from "@testing-library/react";
import { HvButton, HvProvider } from "@hitachivantara/uikit-react-core";
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
      <HvProvider cssBaseline={false}>
        <HvTimeAgo />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render the emptyElement", () => {
    wrapper = render(
      <HvProvider cssBaseline={false}>
        <HvTimeAgo />
      </HvProvider>
    );

    const component = wrapper.getByText(EM_DASH);
    expect(component).toBeVisible();
  });

  it("should render the custom emptyElement", () => {
    const MOCK_EMPTY = "EMPTY";
    wrapper = render(
      <HvProvider cssBaseline={false}>
        <HvTimeAgo emptyElement={MOCK_EMPTY} />
      </HvProvider>
    );

    const component = wrapper.getByText(MOCK_EMPTY);
    expect(component).toBeVisible();
  });
});

describe("TimeAgo with timestamp", () => {
  const timestamp = Date.now();

  it("should be defined", () => {
    const { container } = render(
      <HvProvider cssBaseline={false}>
        <HvTimeAgo timestamp={timestamp} />
      </HvProvider>
    );

    expect(container).toBeDefined();
  });

  it("should contain the relative time", () => {
    const { getByText } = render(
      <HvProvider cssBaseline={false}>
        <HvTimeAgo timestamp={timestamp} />
      </HvProvider>
    );

    const component = getByText("MOCK_TIME_AGO");
    expect(component).toBeVisible();
  });
});

describe("TimeAgo with custom Button element", () => {
  const timestamp = Date.now();

  it("should be defined", () => {
    const { container } = render(
      <HvProvider cssBaseline={false}>
        <HvTimeAgo timestamp={timestamp} component={HvButton} />
      </HvProvider>
    );

    expect(container).toBeDefined();
  });

  it("should render the Button", () => {
    const { getByRole } = render(
      <HvProvider cssBaseline={false}>
        <HvTimeAgo timestamp={timestamp} component={HvButton} />
      </HvProvider>
    );

    const component = getByRole("button");
    expect(component).toBeVisible();
  });
});
