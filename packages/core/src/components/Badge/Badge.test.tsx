import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Alert } from "@hitachivantara/uikit-icons";

import { HvBadge } from "./Badge";

describe("Badge", () => {
  it("should render correctly", () => {
    const { container } = render(<HvBadge />);
    expect(container).toBeDefined();
  });

  it("should render a small dot when count>0 without showCount", () => {
    const { container } = render(<HvBadge count={12} />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with showCount", () => {
    const { container } = render(<HvBadge count={12} showCount />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with showCount and one-digit count", () => {
    const { container } = render(<HvBadge count={9} showCount />);
    expect(container).toMatchSnapshot();
  });

  it("should render nothing when count is 0 even with showCount", () => {
    const { container } = render(<HvBadge count={0} showCount />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with maxCount", () => {
    const { container } = render(<HvBadge count={100} showCount />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with text", () => {
    const { container } = render(
      <HvBadge count={100} showCount text="hello" textVariant="title3" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with svg", () => {
    const { container } = render(
      <HvBadge count={100} showCount icon={<Alert />} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with custom label", () => {
    const { container } = render(<HvBadge label="New!" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with custom one-character label", () => {
    const { container } = render(<HvBadge label="!" />);
    expect(container).toMatchSnapshot();
  });

  it("should render custom label but not count when both are specified", () => {
    const { container } = render(<HvBadge label="New!" count={23} showCount />);
    expect(container).toMatchSnapshot();
  });
});
