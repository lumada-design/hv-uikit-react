import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "@hitachivantara/uikit-react-icons";
import { HvBadge } from "./Badge";

describe("Badge", () => {
  it("should render a small dot when count>0 without showCount", () => {
    render(<HvBadge count={12} />);
    expect(screen.queryByText("12")).toBeNull();
  });

  it("should render correctly with showCount", () => {
    render(<HvBadge count={12} showCount />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("should render correctly with showCount and one-digit count", () => {
    render(<HvBadge count={9} showCount />);
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("should render nothing when count is 0 even with showCount", () => {
    render(<HvBadge count={0} showCount />);
    expect(screen.queryByText("0")).toBeNull();
  });

  it("should render correctly with maxCount", () => {
    render(<HvBadge count={100} showCount />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("should render correctly with text", () => {
    render(<HvBadge count={100} showCount text="hello" textVariant="title3" />);
    expect(screen.queryByText("99+")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("should render correctly with svg", () => {
    render(
      <HvBadge
        count={100}
        showCount
        icon={<Alert role="img" aria-label="Alert" />}
      />
    );
    expect(screen.queryByText("99+")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Alert" })).toBeInTheDocument();
  });

  it("should render correctly with custom label", () => {
    render(<HvBadge label="New!" />);
    expect(screen.getByText("New!")).toBeInTheDocument();
  });

  it("should render correctly with custom one-character label", () => {
    render(<HvBadge label="!" />);
    expect(screen.getByText("!")).toBeInTheDocument();
  });

  it("should render custom label but not count when both are specified", () => {
    render(<HvBadge label="New!" count={23} showCount />);
    expect(screen.getByText("New!")).toBeInTheDocument();
    expect(screen.queryByText("23")).toBeNull();
  });
});
