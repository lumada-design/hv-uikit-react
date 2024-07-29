import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { Close } from "@hitachivantara/uikit-react-icons";

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
    <HvCanvasBottomPanel
      open
      tabs={panelTabs}
      overflowActions={[{ id: "action", label: "Action", icon: <Close /> }]}
      {...props}
    >
      Content
    </HvCanvasBottomPanel>,
  );

describe("CanvasBottomPanel", () => {
  it("triggers onTabChange when changing the selected tab", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    renderSimplePanel({ onTabChange: clickMock });

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
    expect(clickMock).toHaveBeenCalledTimes(1);
  });

  it("triggers onAction when an action is clicked", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    renderSimplePanel({ onAction: clickMock });

    const dropdownMenu = screen.getAllByRole("button", {
      name: "Dropdown menu",
    });
    await user.click(dropdownMenu[0]);
    const menuItem = screen.getByRole("menuitem", { name: "Action" });
    await user.click(menuItem);
    expect(clickMock).toHaveBeenCalledTimes(1);
  });
});
