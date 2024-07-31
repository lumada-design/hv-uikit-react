import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HvCanvasPanelTab } from "../PanelTab/PanelTab";
import { HvCanvasPanelTabs, HvCanvasPanelTabsProps } from "./PanelTabs";

const Controlled = ({
  onChange,
  ...others
}: Partial<HvCanvasPanelTabsProps>) => {
  const [selected, setSelected] = useState(2);

  return (
    <HvCanvasPanelTabs
      value={selected}
      onChange={(e, v) => {
        onChange?.(e, v);
        setSelected(v as number);
      }}
      {...others}
    >
      <HvCanvasPanelTab value={0}>Tab 1</HvCanvasPanelTab>
      <HvCanvasPanelTab value={1}>Tab 2</HvCanvasPanelTab>
      <HvCanvasPanelTab value={2}>Tab 3</HvCanvasPanelTab>
    </HvCanvasPanelTabs>
  );
};

describe("CanvasTabs", () => {
  it("renders tabs", () => {
    render(
      <HvCanvasPanelTabs>
        <HvCanvasPanelTab value={0}>Tab 1</HvCanvasPanelTab>
        <HvCanvasPanelTab value={1}>Tab 2</HvCanvasPanelTab>
        <HvCanvasPanelTab value={2}>Tab 3</HvCanvasPanelTab>
      </HvCanvasPanelTabs>,
    );
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

  it("selects new tab and calls onChange when uncontrolled", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    render(
      <HvCanvasPanelTabs defaultValue={0} onChange={clickMock}>
        <HvCanvasPanelTab value={0}>Tab 1</HvCanvasPanelTab>
        <HvCanvasPanelTab value={1}>Tab 2</HvCanvasPanelTab>
        <HvCanvasPanelTab value={2}>Tab 3</HvCanvasPanelTab>
      </HvCanvasPanelTabs>,
    );
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Tab 1",
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(2);

    const allTabs = screen.getAllByRole("tab");
    await user.click(allTabs[2]);

    expect(clickMock).toHaveBeenCalledOnce();
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Tab 3",
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(2);
  });

  it("selects new tab and calls onChange when controlled", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    render(<Controlled onChange={clickMock} />);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Tab 3",
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(2);

    const allTabs = screen.getAllByRole("tab");
    await user.click(allTabs[0]);

    expect(clickMock).toHaveBeenCalledOnce();
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Tab 1",
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(2);
  });
});
