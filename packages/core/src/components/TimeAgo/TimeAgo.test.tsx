import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { HvButton } from "@hitachivantara/uikit-react-core";
import { HvTimeAgo } from "./TimeAgo";

const EM_DASH = "—";

const MOCK_TIME_AGO = "MOCK_TIME_AGO";
const MOCK_DELAY = 120;

vi.mock("./formatUtils", () => ({
  formatTimeAgo: vi.fn(() => ({ timeAgo: MOCK_TIME_AGO, delay: MOCK_DELAY })),
}));

describe("TimeAgo without timestamp", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = render(<HvTimeAgo />);
    expect(wrapper).toBeDefined();
  });

  it("should render the emptyElement", () => {
    wrapper = render(<HvTimeAgo />);

    const component = wrapper.getByText(EM_DASH);
    expect(component).toBeVisible();
  });

  it("should render the custom emptyElement", () => {
    const MOCK_EMPTY = "EMPTY";
    wrapper = render(<HvTimeAgo emptyElement={MOCK_EMPTY} />);

    const component = wrapper.getByText(MOCK_EMPTY);
    expect(component).toBeVisible();
  });
});

describe("TimeAgo with timestamp", () => {
  const timestamp = Date.now();

  it("should be defined", () => {
    const { container } = render(<HvTimeAgo timestamp={timestamp} />);

    expect(container).toBeDefined();
  });

  it("should contain the relative time", () => {
    const { getByText } = render(<HvTimeAgo timestamp={timestamp} />);

    const component = getByText("MOCK_TIME_AGO");
    expect(component).toBeVisible();
  });
});

describe("TimeAgo with custom Button element", () => {
  const timestamp = Date.now();

  it("should be defined", () => {
    const { container } = render(
      <HvTimeAgo timestamp={timestamp} component={HvButton} />
    );

    expect(container).toBeDefined();
  });

  it("should render the Button", () => {
    const { getByRole } = render(
      <HvTimeAgo timestamp={timestamp} component={HvButton} />
    );

    const component = getByRole("button");
    expect(component).toBeVisible();
  });
});
