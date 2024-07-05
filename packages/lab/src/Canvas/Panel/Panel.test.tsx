import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HvButton } from "@hitachivantara/uikit-react-core";

import { HvCanvasPanel, HvCanvasPanelProps } from "./Panel";

const label = "Test";

const tabs = [
  {
    id: "1",
    content: "Add Data",
  },
  {
    id: "2",
    content: "Model Structure",
  },
];

const renderSimplePanel = (props?: HvCanvasPanelProps) =>
  render(
    <HvCanvasPanel {...props} tabs={tabs}>
      <HvButton>{label}</HvButton>
    </HvCanvasPanel>,
  );

const ControlledPanel = ({
  onToggle,
  ...others
}: Partial<HvCanvasPanelProps>) => {
  const [opened, setOpened] = useState(false);
  return (
    <HvCanvasPanel
      open={opened}
      onToggle={(e, v) => {
        onToggle?.(e, v);
        setOpened(!opened);
      }}
      tabs={tabs}
      {...others}
    >
      <HvButton>{label}</HvButton>
    </HvCanvasPanel>
  );
};

const ControlledTabs = ({
  onTabChange,
  ...others
}: Partial<HvCanvasPanelProps>) => {
  const [tab, setTab] = useState(tabs[1].id);
  return (
    <HvCanvasPanel
      tab={tab}
      onTabChange={(e, v) => {
        onTabChange?.(e, v);
        setTab(v as string);
      }}
      tabs={tabs}
      defaultOpen
      {...others}
    >
      <HvButton>{label}</HvButton>
    </HvCanvasPanel>
  );
};

const expectSimplePanelClosed = () => {
  const openBtn = screen.getByRole("button", { name: "Open" });
  const content = screen.queryByRole("button", { name: label });
  const tabList = screen.queryByRole("tablist");
  expect(content).toBeNull();
  expect(tabList).toBeNull();
  expect(openBtn).toBeInTheDocument();
};

const expectSimplePanelOpened = () => {
  const closeBtn = screen.getByRole("button", { name: "Close" });
  const content = screen.getByRole("button", { name: label });
  const tabList = screen.getByRole("tablist");
  expect(content).not.toBeNull();
  expect(content).toBeInTheDocument();
  expect(tabList).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();
};

describe("CanvasPanel", () => {
  it("does not show tabs when not provided", () => {
    renderSimplePanel({ tabs: [] });
    const tabList = screen.queryByRole("tablist");
    expect(tabList).toBeNull();
  });

  it("shows and hides the content and tabs when toggled and defaultOpen is false", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    renderSimplePanel({ onToggle: clickMock });
    expectSimplePanelClosed();

    const openBtn = screen.getByRole("button", { name: "Open" });
    await user.click(openBtn);
    expect(clickMock).toHaveBeenCalledOnce();
    expectSimplePanelOpened();

    const closeBtn = screen.getByRole("button", { name: "Close" });
    await user.click(closeBtn);
    expect(clickMock).toHaveBeenCalledTimes(2);
    expectSimplePanelClosed();
  });

  it("hides and shows the content and tabs when toggled and defaultOpen is true", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    renderSimplePanel({ onToggle: clickMock, defaultOpen: true });
    expectSimplePanelOpened();

    const closeBtn = screen.getByRole("button", { name: "Close" });
    await user.click(closeBtn);
    expect(clickMock).toHaveBeenCalledOnce();
    expectSimplePanelClosed();

    const openBtn = screen.getByRole("button", { name: "Open" });
    await user.click(openBtn);
    expect(clickMock).toHaveBeenCalledTimes(2);
    expectSimplePanelOpened();
  });

  it("shows and hides the content and tabs when toggled and controlled", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    render(<ControlledPanel onToggle={clickMock} />);
    expectSimplePanelClosed();

    const openBtn = screen.getByRole("button", { name: "Open" });
    await user.click(openBtn);
    expect(clickMock).toHaveBeenCalledOnce();
    expectSimplePanelOpened();

    const closeBtn = screen.getByRole("button", { name: "Close" });
    await user.click(closeBtn);
    expect(clickMock).toHaveBeenCalledTimes(2);
    expectSimplePanelClosed();
  });

  it("triggers onTabChange when a tab is clicked", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    renderSimplePanel({ onTabChange: clickMock, defaultOpen: true });

    const panelTabs = screen.getAllByRole("tab");
    expect(panelTabs).toHaveLength(2);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      tabs[0].content,
    );
    expect(screen.getByRole("tab", { selected: false })).toHaveTextContent(
      tabs[1].content,
    );

    await user.click(panelTabs[1]);
    expect(clickMock).toHaveBeenCalledOnce();
    expect(screen.getByRole("tab", { selected: false })).toHaveTextContent(
      tabs[0].content,
    );
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      tabs[1].content,
    );
  });

  it("overrides labels", async () => {
    const user = userEvent.setup();
    const closeLabel = "Close1";
    const openLabel = "Open2";
    renderSimplePanel({ labels: { close: closeLabel, open: openLabel } });

    const openBtn = screen.getByRole("button", { name: openLabel });
    expect(openBtn).toBeInTheDocument();

    await user.click(openBtn);

    const closeBtn = screen.getByRole("button", { name: closeLabel });
    expect(closeBtn).toBeInTheDocument();
  });

  it("can control selected tab", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    render(<ControlledTabs onTabChange={clickMock} />);

    const panelTabs = screen.getAllByRole("tab");
    expect(panelTabs).toHaveLength(2);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      tabs[1].content,
    );
    expect(screen.getByRole("tab", { selected: false })).toHaveTextContent(
      tabs[0].content,
    );

    await user.click(panelTabs[0]);
    expect(clickMock).toHaveBeenCalledOnce();
    expect(screen.getByRole("tab", { selected: false })).toHaveTextContent(
      tabs[1].content,
    );
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      tabs[0].content,
    );
  });
});
