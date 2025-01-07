import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvTab } from "./Tab";
import { HvTabs } from "./Tabs";

describe("Tabs", () => {
  it("should render correctly", () => {
    render(
      <HvTabs>
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab label="Clickable tab 3" />
      </HvTabs>,
    );

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab").length).toBe(3);
  });
});
