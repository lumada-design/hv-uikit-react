import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";

import { HvCanvasToolbarTabs, HvCanvasToolbarTabsProps } from "./ToolbarTabs";

const Sample = (props: Partial<HvCanvasToolbarTabsProps>) => (
  <HvCanvasToolbarTabs
    defaultTabs={[
      {
        id: "tab1",
        label: "Tab 1",
      },
      {
        id: "tab2",
        label: "Tab 2",
      },
      {
        id: "tab3",
        label: "Tab 3",
      },
    ]}
    {...props}
  />
);

describe("CanvasToolbarTabs", () => {
  it("can override labels", async () => {
    const user = userEvent.setup();
    render(
      <Sample
        labels={{
          close: "Close 1",
          create: "Create 1",
          undefined: "Name the tab",
        }}
      />,
    );

    const closeBtn = screen.getAllByRole("button", {
      name: "Close 1",
    });
    const createBtn = screen.getByRole("button", {
      name: "Create 1",
    });
    expect(closeBtn).toHaveLength(3);
    expect(createBtn).toBeInTheDocument();
    await user.click(createBtn);

    const newTab = screen.getByRole("tab", { selected: true });
    expect(newTab).toHaveAttribute("aria-label", "Name the tab 4");
  });

  it("triggers onTabChange and onChange when removing the selected tab", async () => {
    const user = userEvent.setup();
    const onTabChangeMock = vi.fn();
    const onChangeMock = vi.fn();
    render(<Sample onTabChange={onTabChangeMock} onChange={onChangeMock} />);

    const closeBtn = screen.getAllByRole("button", {
      name: "Close",
    });
    await user.click(closeBtn[0]);
    expect(onTabChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("only triggers onChange when removing a non-selected tab", async () => {
    const user = userEvent.setup();
    const onTabChangeMock = vi.fn();
    const onChangeMock = vi.fn();
    render(<Sample onTabChange={onTabChangeMock} onChange={onChangeMock} />);

    const closeBtn = screen.getAllByRole("button", {
      name: "Close",
    });
    await user.click(closeBtn[1]);
    expect(onTabChangeMock).not.toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("triggers onTabChange and onChange when adding a tab", async () => {
    const user = userEvent.setup();
    const onTabChangeMock = vi.fn();
    const onChangeMock = vi.fn();
    render(<Sample onTabChange={onTabChangeMock} onChange={onChangeMock} />);

    const createBtn = screen.getByRole("button", {
      name: "Create new",
    });
    await user.click(createBtn);
    expect(onTabChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("triggers onChange when editing a tab", async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<Sample onChange={onChangeMock} />);

    const editButton = screen.getByRole("button", { name: "Tab 1" });
    await user.click(editButton);
    const input = screen.getByRole("textbox");
    await user.clear(input);
    const newLabel = "My new label";
    await user.type(input, newLabel);

    const selectedTab = screen.getByRole("tab", { selected: true });
    expect(selectedTab).toHaveAttribute("aria-label", newLabel);
    expect(onChangeMock).toHaveBeenCalledTimes(newLabel.length + 1); // +1 for .clear()
  });

  it("triggers onTabChange when changing tab", async () => {
    const user = userEvent.setup();
    const onTabChangeMock = vi.fn();
    render(<Sample onTabChange={onTabChangeMock} />);

    // Change selected tab
    const secondTab = screen.getByRole("button", {
      name: "Tab 2",
    });
    await user.click(secondTab);
    expect(onTabChangeMock).toHaveBeenCalledTimes(1);
  });
});
