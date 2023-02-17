import { Add, Delete, Preview, Lock } from "@hitachivantara/uikit-react-icons";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { HvBulkActions } from "./BulkActions";

const WithoutActions = () => {
  const [numSelected, setNumSelected] = useState<number>(0);

  const handleSelectAll = () => {
    setNumSelected(8);
  };

  return (
    <HvBulkActions
      numTotal={8}
      numSelected={numSelected}
      onSelectAll={handleSelectAll}
      maxVisibleActions={3}
    />
  );
};

const WithActions = () => {
  const [numSelected, setNumSelected] = useState<number>(0);

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
    />
  );
};

describe("BulkActions", () => {
  describe("Without actions", () => {
    it("should be defined", () => {
      const { container } = render(<WithoutActions />);

      expect(container).toBeDefined();
    });

    it("should render correctly", () => {
      const { container } = render(<WithoutActions />);

      expect(container).toMatchSnapshot();
    });

    it("should render select all component correctly", async () => {
      const { getByRole, getByLabelText } = render(<WithoutActions />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(getByLabelText("All (8)")).toBeInTheDocument();

      // Select all
      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
      expect(getByLabelText("8 / 8")).toBeInTheDocument();
    });

    it("should call select all correctly", async () => {
      const onSelectAllMock = vi.fn();

      const { getAllByRole } = render(
        <HvBulkActions
          numTotal={5}
          numSelected={0}
          onSelectAll={onSelectAllMock}
        />
      );

      const checkboxes = getAllByRole("checkbox");

      const selectAll = checkboxes[0];

      // Select all
      await userEvent.click(selectAll);

      expect(onSelectAllMock).toBeCalledTimes(1);
    });

    it("should render the custom label", () => {
      const { getByLabelText } = render(
        <HvBulkActions
          numTotal={5}
          numSelected={0}
          selectAllLabel="MockLabel"
        />
      );

      expect(getByLabelText("MockLabel (5)")).toBeInTheDocument();
    });
  });

  describe("With actions", () => {
    it("should be defined", () => {
      const { container } = render(<WithActions />);

      expect(container).toBeDefined();
    });

    it("should render correctly", () => {
      const { container } = render(<WithActions />);

      expect(container).toMatchSnapshot();
    });

    it("should render the actions correctly", async () => {
      const { getAllByRole, getByRole } = render(<WithActions />);

      const buttons = getAllByRole("button");

      expect(buttons.length).toBe(3);

      const button1 = buttons[0];
      const button2 = buttons[1];
      const button3 = buttons[2];

      expect(button1).toBeDisabled();
      expect(button2).toBeDisabled();
      expect(button3).toBeDisabled();

      const checkbox = getByRole("checkbox");

      // Select all
      await userEvent.click(checkbox);

      expect(button1).toBeEnabled();
      expect(button2).toBeEnabled();
      expect(button3).toBeEnabled();

      // Open tooltip
      await userEvent.click(button3);

      const tooltip = getByRole("tooltip");

      expect(tooltip).toBeInTheDocument();

      const menu = getByRole("menu");
      const items = getAllByRole("menuitem");

      expect(menu).toBeInTheDocument();
      expect(items.length).toBe(2);
    });
  });
});
