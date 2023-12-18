import {
  Add,
  Delete,
  Preview,
  Upload,
} from "@hitachivantara/uikit-react-icons";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HvActionsGeneric } from "./ActionsGeneric";

const actions = [
  { id: "post", label: "Add", icon: <Add />, disabled: true },
  { id: "get", label: "Preview", icon: <Upload /> },
  { id: "put", label: "Upload", icon: <Delete /> },
  { id: "delete", label: "Delete", icon: <Preview /> },
];

describe("ActionsGeneric", () => {
  it("should only show maxVisibleActions actions", () => {
    render(<HvActionsGeneric actions={actions} maxVisibleActions={2} />);
    expect(screen.queryAllByRole("button").length).toBe(3);

    expect(screen.getByLabelText("Dropdown menu")).toBeInTheDocument();
  });

  it("should call actionsCallback on button click", () => {
    const mockFn = vi.fn();
    render(<HvActionsGeneric actions={actions} actionsCallback={mockFn} />);
    const button = screen.queryAllByRole("button")[1];
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });

  it("should not call actionsCallback if the button is disabled", () => {
    const mockFn = vi.fn();
    render(<HvActionsGeneric actions={actions} actionsCallback={mockFn} />);
    const button = screen.queryAllByRole("button")[0];
    fireEvent.click(button);
    expect(mockFn).not.toHaveBeenCalled();
  });
});
