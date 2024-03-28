import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Add, Delete, Lock, Preview } from "@hitachivantara/uikit-react-icons";

import { HvBulkActions, HvBulkActionsProps } from "./BulkActions";

const Sample = (props: Partial<HvBulkActionsProps>) => {
  const [numSelected, setNumSelected] = useState(0);

  const handleSelectAll = () => {
    setNumSelected(8);
  };

  return (
    <HvBulkActions
      numTotal={8}
      numSelected={numSelected}
      onSelectAll={handleSelectAll}
      maxVisibleActions={2}
      actions={[
        { id: "add", label: "Add", icon: <Add /> },
        { id: "delete", label: "Delete", icon: <Delete /> },
        { id: "lock", label: "Lock", icon: <Lock /> },
        { id: "put", label: "Preview", icon: <Preview /> },
      ]}
      {...props}
    />
  );
};

describe("BulkActions", () => {
  it("should render select all component correctly", async () => {
    const user = userEvent.setup();
    render(<Sample />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAccessibleName("All (8)");

    // Select all
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAccessibleName("8 / 8");
  });

  it("should call select all correctly", async () => {
    const user = userEvent.setup();
    const callbackSpy = vi.fn();

    render(<Sample onSelectAll={callbackSpy} />);

    const checkbox = screen.getByRole("checkbox");

    // Select all
    await user.click(checkbox);

    expect(callbackSpy).toHaveBeenCalledOnce();
  });

  it("should render the custom label for the select all checkbox", () => {
    render(<Sample selectAllLabel="MockLabel" />);

    const checkbox = screen.getByRole("checkbox", { name: "MockLabel (8)" });

    expect(checkbox).toBeInTheDocument();
  });

  // TODO - only test onAction in v6
  it("should render the actions correctly and call onAction and actionsCallback when clicked", async () => {
    const user = userEvent.setup();
    const callbackSpy = vi.fn();

    render(<Sample onAction={callbackSpy} actionsCallback={callbackSpy} />);

    const buttons = screen.getAllByRole("button");
    const button1 = buttons[0];
    const button2 = buttons[1];
    const button3 = buttons[2];

    expect(buttons).toHaveLength(3);
    expect(button1).toBeDisabled();
    expect(button2).toBeDisabled();
    expect(button3).toBeDisabled();

    const checkbox = screen.getByRole("checkbox");

    // Select all
    await user.click(checkbox);

    expect(button1).toBeEnabled();
    expect(button2).toBeEnabled();
    expect(button3).toBeEnabled();

    // Click action
    await user.click(button1);

    expect(callbackSpy).toHaveBeenCalledTimes(2);

    // Open actions
    await user.click(button3);

    const menu = screen.getByRole("menu");
    const items = screen.getAllByRole("menuitem");

    expect(menu).toBeInTheDocument();
    expect(items).toHaveLength(2);
  });
});
