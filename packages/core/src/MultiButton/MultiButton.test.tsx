import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvButton } from "../Button";
import { HvMultiButton } from "./MultiButton";

describe("MultiButton", () => {
  it("should render the buttons", () => {
    render(
      <HvMultiButton>
        <HvButton key="1" startIcon={<div />}>
          Button1
        </HvButton>
        <HvButton key="2" startIcon={<div />}>
          Button2
        </HvButton>
      </HvMultiButton>,
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
