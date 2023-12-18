import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvLabel } from ".";

describe("Label", () => {
  it("should render the label", () => {
    render(<HvLabel label="LABEL" />);
    expect(screen.getByText("LABEL")).toBeInTheDocument();
  });
});
