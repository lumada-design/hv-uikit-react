import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvCharCounter } from ".";

describe("CharCounter", () => {
  it("should renders the current and max quantity", () => {
    render(<HvCharCounter currentCharQuantity={4} maxCharQuantity={10} />);
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("/ 10")).toBeInTheDocument();
  });
});
