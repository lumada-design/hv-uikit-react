import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { HvButton } from "@hitachivantara/uikit-react-core";
import { Close, DropUpXS } from "@hitachivantara/uikit-react-icons";

import { HvCanvasBottomPanel, HvCanvasBottomPanelProps } from "./BottomPanel";

const panelTabs = [
  {
    id: 0,
    title: "Tab 1",
  },
  {
    id: 1,
    title: "Tab 2",
  },
];

const renderSimplePanel = (props?: Partial<HvCanvasBottomPanelProps>) =>
  render(
    <HvCanvasBottomPanel {...props} tabs={panelTabs}>
      Content
    </HvCanvasBottomPanel>,
  );

const ControlledOpen = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <HvButton onClick={() => setOpen((prev) => !prev)}>Toggle</HvButton>
      <HvCanvasBottomPanel tabs={panelTabs} open={open}>
        Content
      </HvCanvasBottomPanel>
    </>
  );
};

const ControlledTab = (props?: Partial<HvCanvasBottomPanelProps>) => {
  const [tab, setTab] = useState(panelTabs[1].id);
  return (
    <HvCanvasBottomPanel
      {...props}
      tabs={panelTabs}
      tab={tab}
      onTabChange={(e, id) => {
        setTab(id as number);
        props?.onTabChange?.(e, id);
      }}
    >
      Content
    </HvCanvasBottomPanel>
  );
};

const ControlledMinimize = (props?: Partial<HvCanvasBottomPanelProps>) => {
  const [minimize, setMinimize] = useState(false);
  return (
    <>
      <HvButton onClick={() => setMinimize((prev) => !prev)}>Toggle</HvButton>
      <HvCanvasBottomPanel {...props} tabs={panelTabs} minimize={minimize}>
        Content
      </HvCanvasBottomPanel>
    </>
  );
};

const expectPanelOpened = () => {
  const tablist = screen.getByRole("tablist");
  const tabs = screen.getAllByRole("tab");
  const tabPanel = screen.getByRole("tabpanel");
  expect(tabs).toHaveLength(panelTabs.length);
  expect(tabs.map((tab) => tab.textContent)).toEqual(["Tab 1", "Tab 2"]);
  expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
    "Tab 1",
  );
  expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(1);
  expect(tablist).toBeInTheDocument();
  expect(tabPanel).toBeInTheDocument();
  expect(tabPanel).toHaveTextContent("Content");
};

const expectPanelClosed = () => {
  const tablist = screen.queryByRole("tablist");
  const tabPanel = screen.queryByRole("tabpanel");
  expect(tablist).toBeNull();
  expect(tabPanel).toBeNull();
};

describe("CanvasBottomPanel", () => {
  it("renders all components when opened", () => {
    renderSimplePanel({
      open: true,
      leftActions: [{ id: "minimize", label: "Minimize", icon: <DropUpXS /> }],
      rightActions: [{ id: "close", label: "Close", icon: <Close /> }],
    });
    expectPanelOpened();
    const leftActions = screen.getAllByRole("button", { name: "Minimize" });
    const rightActions = screen.getAllByRole("button", { name: "Close" });
    expect(leftActions).toHaveLength(panelTabs.length);
    expect(rightActions).toHaveLength(panelTabs.length);
  });

  it("is closed by default", () => {
    renderSimplePanel();
    expectPanelClosed();
  });

  it("closes and opens by controlling the component", async () => {
    const user = userEvent.setup();
    render(<ControlledOpen />);
    expectPanelClosed();
    const toggle = screen.getByRole("button", { name: "Toggle" });
    await user.click(toggle);
    expectPanelOpened();
  });

  it("switches the selected tab and onTabChange is triggered when uncontrolled", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    renderSimplePanel({ open: true, onTabChange: clickMock });

    const tabs = screen.getAllByRole("tab");
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Tab 1",
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(1);
    await user.click(tabs[1]);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Tab 2",
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(1);
    expect(clickMock).toHaveBeenCalled();
  });

  it("switches the selected tab and onTabChange is triggered when controlled", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    render(<ControlledTab open onTabChange={clickMock} />);

    const tabs = screen.getAllByRole("tab");
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Tab 2",
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(1);
    await user.click(tabs[0]);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Tab 1",
    );
    expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(1);
    expect(clickMock).toHaveBeenCalled();
  });

  it("minimizes and maximizes the tabs by controlling the component", async () => {
    const user = userEvent.setup();
    render(<ControlledMinimize open />);

    const toggle = screen.getByRole("button", { name: "Toggle" });
    const tablist = screen.getByRole("tablist");
    const tabs = screen.getAllByRole("tab");
    const tabPanel = screen.queryByRole("tabpanel");
    expect(tablist).toBeInTheDocument();
    expect(tabs).toHaveLength(panelTabs.length);
    expect(tabPanel).toBeInTheDocument();

    await user.click(toggle);

    expect(tablist).toBeInTheDocument();
    expect(tabs).toHaveLength(panelTabs.length);
    expect(tabPanel).not.toBeVisible();
  });

  it("renders the correct number of actions and onAction is triggered", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    renderSimplePanel({
      open: true,
      onAction: clickMock,
      leftActions: [
        { id: "action4", label: "Action4", icon: <DropUpXS /> },
        { id: "action5", label: "Action4", icon: <DropUpXS /> },
      ],
      rightActions: [
        { id: "action1", label: "Action1", icon: <Close /> },
        { id: "action2", label: "Action2", icon: <Close /> },
        { id: "action3", label: "Action3", icon: <Close /> },
      ],
    });

    const dropdownMenus = screen.getAllByRole("button", {
      name: "Dropdown menu",
    });
    const action4Btns = screen.getAllByRole("button", { name: "Action4" });
    const action1Btns = screen.getAllByRole("button", { name: "Action1" });
    const action2Btns = screen.getAllByRole("button", { name: "Action2" });
    expect(dropdownMenus).toHaveLength(panelTabs.length * 2);
    expect(action4Btns).toHaveLength(panelTabs.length);
    expect(action1Btns).toHaveLength(panelTabs.length);
    expect(action2Btns).toHaveLength(panelTabs.length);

    // Click left action for first tab
    await user.click(dropdownMenus[0]);
    const leftMenu = screen.getByRole("menu");
    const leftMenuItems = screen.getAllByRole("menuitem");
    expect(leftMenu).toBeInTheDocument();
    expect(leftMenuItems).toHaveLength(1);
    await user.click(leftMenuItems[0]);
    expect(clickMock).toHaveBeenCalled();

    // Click right action for first tab
    await user.click(dropdownMenus[1]);
    const rightMenu = screen.getByRole("menu");
    const rightMenuItems = screen.getAllByRole("menuitem");
    expect(rightMenu).toBeInTheDocument();
    expect(rightMenuItems).toHaveLength(1);
    await user.click(rightMenuItems[0]);
    expect(clickMock).toHaveBeenCalledTimes(2);
  });
});
