import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Phone } from "@hitachivantara/uikit-react-icons";

import { HvLunara, LunaraItem } from "./HvLunara";

describe("MyComponent", () => {
  const options: LunaraItem[] = [
    { item: "Option 1", callback: () => console.log("Option 1 clicked") },
    { item: "Option 2", callback: () => console.log("Option 2 clicked") },
  ];

  // Rendering of Items with label button

  it("renders label and options", async () => {
    const { getByText, getByRole } = render(
      <HvLunara label="Label" options={options} />,
    );
    expect(getByText("Label")).toBeInTheDocument();
    fireEvent.click(getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("option-list")).toBeVisible();
    });

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  // Invoke of callback functions

  it("calls callback when option is clicked", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const testOptions = [
      { item: "Option 1", callback: callback1 },
      { item: "Option 2", callback: callback2 },
    ];
    const { getByText } = render(
      <HvLunara label="Label" options={testOptions} />,
    );

    fireEvent.click(getByText("Option 1"));
    expect(callback1).toHaveBeenCalled();

    fireEvent.click(getByText("Option 2"));
    expect(callback2).toHaveBeenCalled();
  });

  // Expand and Collapse of List

  it("expands and collapses options", async () => {
    const { getByRole, queryByText } = render(
      <HvLunara label="Label" options={options} />,
    );
    const labelButton = getByRole("button");

    userEvent.click(labelButton);
    await waitFor(() => {
      expect(screen.getByTestId("option-list")).toBeVisible();
    });
    expect(queryByText("Option 1")).toBeVisible();
    expect(queryByText("Option 2")).toBeVisible();

    userEvent.click(labelButton);
    await waitFor(() => {
      expect(screen.getByTestId("option-list")).not.toBeVisible();
    });
    expect(queryByText("Option 1")).not.toBeVisible();
    expect(queryByText("Option 2")).not.toBeVisible();
  });

  // Icon as one of the item

  it("renders icon as one of the options", async () => {
    const options2: LunaraItem[] = [
      { item: "Option 1", callback: vi.fn() },
      { item: <Phone aria-label="call" />, callback: vi.fn() },
    ];
    render(<HvLunara label="Label" options={options2} />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByTestId("option-list")).toBeVisible();
    });
    screen.debug();
    expect(screen.getByTitle("call")).toBeInTheDocument();
  });
});
