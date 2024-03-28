import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvPanel } from "./Panel";

describe("Panel", () => {
  it("should render the Panel", async () => {
    render(
      <HvPanel>
        <div>Panel Content</div>
      </HvPanel>,
    );
    const component = await screen.findAllByText("Panel Content");
    expect(component.length).toBe(1);
  });
});
