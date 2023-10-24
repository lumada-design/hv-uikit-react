import { useState } from "react";
import { Add, Delete, Preview, Lock } from "@hitachivantara/uikit-react-icons";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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
  describe("Without actions", () => {
    it("should render select all component correctly", async () => {
      render(<Sample actions={undefined} />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(screen.getByLabelText("All (8)")).toBeInTheDocument();

      // Select all
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
      expect(screen.getByLabelText("8 / 8")).toBeInTheDocument();
    });

    it("should call select all correctly", async () => {
      const onSelectAllMock = vi.fn();

      render(
        <HvBulkActions
          numTotal={5}
          numSelected={0}
          onSelectAll={onSelectAllMock}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");

      const selectAll = checkboxes[0];

      // Select all
      fireEvent.click(selectAll);

      expect(onSelectAllMock).toBeCalledTimes(1);
    });

    it("should render the custom label", () => {
      render(
        <HvBulkActions
          numTotal={5}
          numSelected={0}
          selectAllLabel="MockLabel"
        />
      );

      expect(screen.getByLabelText("MockLabel (5)")).toBeInTheDocument();
    });
  });

  describe("With actions", () => {
    it("should render the actions correctly", async () => {
      render(<Sample />);

      const buttons = screen.getAllByRole("button");

      expect(buttons.length).toBe(3);

      const button1 = buttons[0];
      const button2 = buttons[1];
      const button3 = buttons[2];

      expect(button1).toBeDisabled();
      expect(button2).toBeDisabled();
      expect(button3).toBeDisabled();

      const checkbox = screen.getByRole("checkbox");

      // Select all
      fireEvent.click(checkbox);

      expect(button1).toBeEnabled();
      expect(button2).toBeEnabled();
      expect(button3).toBeEnabled();

      // Open actions
      fireEvent.click(button3);
      const menu = screen.getByRole("menu");
      const items = screen.getAllByRole("menuitem");

      expect(menu).toBeInTheDocument();
      expect(items.length).toBe(2);
    });
  });
});
