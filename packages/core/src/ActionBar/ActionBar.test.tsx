import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvButton } from "../Button";
import { HvActionBar } from "./ActionBar";

describe("ActionBar", () => {
  it("renders content correctly", () => {
    render(
      <HvActionBar>
        <HvButton>CONTENT</HvButton>
      </HvActionBar>,
    );
    const content = screen.getByRole("button", { name: "CONTENT" });
    expect(content).toBeInTheDocument();
  });
});
