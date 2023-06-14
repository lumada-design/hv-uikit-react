import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HvButton } from "@hitachivantara/uikit-react-core";
import { HvTimeAgo } from "./TimeAgo";

const EM_DASH = "—";

describe("TimeAgo without timestamp", () => {
  it("should render the emptyElement", () => {
    render(<HvTimeAgo />);

    const component = screen.getByText(EM_DASH);
    expect(component).toBeVisible();
  });

  it("should render the custom emptyElement", () => {
    const MOCK_EMPTY = "EMPTY";
    render(<HvTimeAgo emptyElement={MOCK_EMPTY} />);

    const component = screen.getByText(MOCK_EMPTY);
    expect(component).toBeVisible();
  });
});

describe("TimeAgo with timestamp", () => {
  it("should contain the relative time", () => {
    const timestamp = Date.now();
    render(<HvTimeAgo timestamp={timestamp} />);

    expect(screen.getByText("a few seconds")).toBeVisible();
  });
});

describe("TimeAgo with custom Button element", () => {
  it("should render the Button", () => {
    const timestamp = Date.now();
    render(<HvTimeAgo timestamp={timestamp} component={HvButton} />);

    expect(screen.getByRole("button")).toBeVisible();
  });
});
