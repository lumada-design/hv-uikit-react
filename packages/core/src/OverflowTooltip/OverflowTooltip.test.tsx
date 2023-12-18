import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvOverflowTooltip } from "./OverflowTooltip";

describe("OverflowTooltip", () => {
  it("should render the text", () => {
    render(<HvOverflowTooltip data="TEXT" />);
    expect(screen.getByText("TEXT")).toBeInTheDocument();
  });
});
