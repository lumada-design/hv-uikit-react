import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import userEvent from "@testing-library/user-event";

import { HvProvider } from "@core/providers/Provider";

import { HvScrollToHorizontal } from "./ScrollToHorizontal";

const Sample = () => (
  <HvProvider>
    <HvScrollToHorizontal
      options={[
        { label: "Server status summary", value: "mainId1" },
        { label: "Optimization", value: "mainId2" },
        { label: "Performance analysis", value: "mainId3" },
        { label: "Insights", value: "mainId4" },
      ]}
    />
  </HvProvider>
);

describe("ScrollToHorizontal", () => {
  it("renders the section buttons", () => {
    render(<Sample />);

    const tab1 = screen.getByRole("button", { name: "Server status summary" });
    expect(tab1).toBeInTheDocument();

    const tab2 = screen.getByRole("button", { name: "Optimization" });
    expect(tab2).toBeInTheDocument();

    const tab3 = screen.getByRole("button", { name: "Performance analysis" });
    expect(tab3).toBeInTheDocument();

    const tab4 = screen.getByRole("button", { name: "Insights" });
    expect(tab4).toBeInTheDocument();
  });

  it("switches to the correct selected tab", async () => {
    render(<Sample />);

    const tabs = screen.getAllByRole("listitem");
    expect(tabs.length).toBe(4);
    expect(tabs[0]).toHaveAttribute("aria-current", "true");

    const tabButtons = screen.getAllByRole("button");
    expect(tabButtons.length).toBe(4);

    await userEvent.click(tabButtons[3]);

    expect(tabs[0]).toHaveAttribute("aria-current", "false");
    expect(tabs[3]).toHaveAttribute("aria-current", "true");
  });
});
