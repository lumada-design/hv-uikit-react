import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvOverflowTooltip } from "./OverflowTooltip";

describe("OverflowTooltip", () => {
  const { ResizeObserver } = window;

  beforeEach(() => {
    // @ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    vi.restoreAllMocks();
  });

  it("should be defined", () => {
    const { container } = render(<HvOverflowTooltip data="" />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvOverflowTooltip data="" />);
    expect(container).toMatchSnapshot();
  });
});
