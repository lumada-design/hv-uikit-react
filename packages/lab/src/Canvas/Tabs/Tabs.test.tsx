import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HvCanvasTabs } from "./Tabs";

const tabs = [
  {
    id: "1",
    content: "Tab 1",
  },
  {
    id: "2",
    content: "Tab 2",
  },
  {
    id: "3",
    content: "Tab 3",
  },
];

describe("CanvasTabs", () => {
  it("renders tabs", () => {
    render(<HvCanvasTabs tabs={tabs} />);
    const tabList = screen.getByRole("tablist");
    const allTabs = screen.getAllByRole("tab");
    expect(tabList).toBeInTheDocument();
    expect(allTabs).toHaveLength(3);
    expect(allTabs.map((tab) => tab.innerHTML)).toEqual([
      "Tab 1",
      "Tab 2",
      "Tab 3",
    ]);
  });

  it("selects new tab and calls onChange", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    render(<HvCanvasTabs tabs={tabs} onChange={clickMock} />);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      tabs[0].content,
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(2);

    const allTabs = screen.getAllByRole("tab");
    await user.click(allTabs[2]);

    expect(clickMock).toHaveBeenCalledOnce();
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      tabs[2].content,
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(2);
  });
});
