import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HvCanvasTab } from "../Tab/Tab";
import { HvCanvasTabs, HvCanvasTabsProps } from "./Tabs";

const Controlled = ({ onChange, ...others }: Partial<HvCanvasTabsProps>) => {
  const [selected, setSelected] = useState(2);

  return (
    <HvCanvasTabs
      value={selected}
      onChange={(e, v) => {
        onChange?.(e, v);
        setSelected(v as number);
      }}
      {...others}
    >
      <HvCanvasTab value={0}>Tab 1</HvCanvasTab>
      <HvCanvasTab value={1}>Tab 2</HvCanvasTab>
      <HvCanvasTab value={2}>Tab 3</HvCanvasTab>
    </HvCanvasTabs>
  );
};

describe("CanvasTabs", () => {
  it("renders tabs", () => {
    render(
      <HvCanvasTabs>
        <HvCanvasTab value={0}>Tab 1</HvCanvasTab>
        <HvCanvasTab value={1}>Tab 2</HvCanvasTab>
        <HvCanvasTab value={2}>Tab 3</HvCanvasTab>
      </HvCanvasTabs>,
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
      <HvCanvasTabs defaultValue={0} onChange={clickMock}>
        <HvCanvasTab value={0}>Tab 1</HvCanvasTab>
        <HvCanvasTab value={1}>Tab 2</HvCanvasTab>
        <HvCanvasTab value={2}>Tab 3</HvCanvasTab>
      </HvCanvasTabs>,
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
