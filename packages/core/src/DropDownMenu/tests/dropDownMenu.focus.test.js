import React from "react";
import userEvent from "@testing-library/user-event";
import { render, waitFor } from "testing-utils";
import { Main } from "../stories/DropDownMenu.stories";

jest.mock(
  "@popperjs/core",
  () =>
    class {
      constructor() {
        return {
          scheduleUpdate: jest.fn(),
          update: jest.fn(),
          destroy: jest.fn(),
        };
      }
    }
);

describe("DropDownMenu Focus", () => {
  it("should focus first option on open", async () => {
    const { getByRole } = render(<Main />);
    const openButton = getByRole("button");
    userEvent.click(openButton); // open
    expect(openButton).toHaveAttribute("aria-expanded", "true");
    const option = getByRole("menuitem", { name: "Label 1" });
    await waitFor(() => expect(option).toHaveFocus());
  });
});
