import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HvButton } from "@core/components/Button";
import { HvActionBar } from "./ActionBar";

describe("ActionBar", () => {
  it("renders content correctly", () => {
    render(
      <HvActionBar>
        <HvButton>CONTENT</HvButton>
      </HvActionBar>
    );
    const content = screen.getByRole("button", { name: "CONTENT" });
    expect(content).toBeInTheDocument();
  });
});
