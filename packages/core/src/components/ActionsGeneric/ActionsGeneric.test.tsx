import {
  Add,
  Delete,
  Preview,
  Upload,
} from "@hitachivantara/uikit-react-icons";
import { fireEvent, render } from "@testing-library/react";
import { HvProvider } from "providers";
import { describe, expect, it, vi } from "vitest";
import { HvActionsGeneric } from "./ActionsGeneric";

const actions = [
  { id: "post", label: "Add", icon: <Add />, disabled: true },
  { id: "get", label: "Preview", icon: <Upload /> },
  { id: "put", label: "Upload", icon: <Delete /> },
  { id: "delete", label: "Delete", icon: <Preview /> },
];

describe("ActionsGeneric", () => {
  it("should be defined", () => {
    const { container } = render(<HvActionsGeneric actions={actions} />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvActionsGeneric actions={actions} />);
    expect(container).toMatchSnapshot();
  });

  it("should only show maxVisibleActions actions", () => {
    const { queryAllByRole, getByLabelText } = render(
      <HvProvider>
        <HvActionsGeneric actions={actions} maxVisibleActions={2} />
      </HvProvider>
    );
    expect(queryAllByRole("button").length).toBe(3);

    expect(getByLabelText("Dropdown menu")).toBeInTheDocument();
  });

  it("should call actionsCallback on button click", () => {
    const mockFn = vi.fn();
    const { queryAllByRole } = render(
      <HvProvider>
        <HvActionsGeneric actions={actions} actionsCallback={mockFn} />
      </HvProvider>
    );
    const button = queryAllByRole("button")[1];
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });

  it("should not call actionsCallback if the button is disabled", () => {
    const mockFn = vi.fn();
    const { queryAllByRole } = render(
      <HvProvider>
        <HvActionsGeneric actions={actions} actionsCallback={mockFn} />
      </HvProvider>
    );
    const button = queryAllByRole("button")[0];
    fireEvent.click(button);
    expect(mockFn).not.toHaveBeenCalled();
  });
});
