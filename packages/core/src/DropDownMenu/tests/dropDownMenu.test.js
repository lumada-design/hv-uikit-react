import React from "react";
import userEvent from "@testing-library/user-event";
import { render, waitFor, fireEvent } from "testing-utils";
import { Main, Disabled, Controlled } from "../stories/DropDownMenu.stories";

describe("<Dropdown />", () => {
  it("General", () => {
    const { container } = render(<Main />);
    expect(container).toMatchSnapshot();
  });

  it("Disabled", () => {
    const { container } = render(<Disabled />);
    expect(container).toMatchSnapshot();
  });

  it("Controlled", () => {
    const { container } = render(<Controlled />);
    expect(container).toMatchSnapshot();
  });
});

describe("DropDownMenu", () => {
  it("opens on click", async () => {
    const { getByRole } = render(<Main />);
    const openButton = getByRole("button");
    userEvent.click(openButton); // open
    expect(openButton).toHaveAttribute("aria-expanded", "true");
    const option = getByRole("menuitem", { name: "Label 1" });
    await waitFor(() => expect(option).toHaveFocus());
    const option2 = getByRole("menuitem", { name: "Label 2" });
    expect(option2).toBeInTheDocument();
    const option3 = getByRole("menuitem", { name: "Label 3" });
    expect(option3).toBeInTheDocument();
  });

  it("closes after opening click", async () => {
    const { getByRole } = render(<Main />);
    const openButton = getByRole("button");
    userEvent.click(openButton); // open
    expect(openButton).toHaveAttribute("aria-expanded", "true");
    const option = getByRole("menuitem", { name: "Label 1" });
    await waitFor(() => expect(option).toHaveFocus());
    const option2 = getByRole("menuitem", { name: "Label 2" });
    expect(option2).toBeInTheDocument();
    const option3 = getByRole("menuitem", { name: "Label 3" });
    expect(option3).toBeInTheDocument();
    userEvent.click(openButton); // closes
    expect(openButton).toHaveAttribute("aria-expanded", "false");
  });

  it("opens on enter", async () => {
    const { getByRole } = render(<Main />);
    const openButton = getByRole("button");
    userEvent.tab();
    expect(openButton).toHaveFocus();
    fireEvent.keyDown(openButton, { key: "Enter", keyCode: 13 }); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "true");
    });
    const option = getByRole("menuitem", { name: "Label 1" });
    expect(option).toBeInTheDocument();
    const option2 = getByRole("menuitem", { name: "Label 2" });
    expect(option2).toBeInTheDocument();
    const option3 = getByRole("menuitem", { name: "Label 3" });
    expect(option3).toBeInTheDocument();
  });

  it("closes on enter", async () => {
    const { getByRole } = render(<Main />);
    const openButton = getByRole("button");
    userEvent.tab();
    expect(openButton).toHaveFocus();
    fireEvent.keyDown(openButton, { key: "Enter", keyCode: 13 }); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "true");
    });
    const option = getByRole("menuitem", { name: "Label 1" });
    expect(option).toBeInTheDocument();
    const option2 = getByRole("menuitem", { name: "Label 2" });
    expect(option2).toBeInTheDocument();
    const option3 = getByRole("menuitem", { name: "Label 3" });
    expect(option3).toBeInTheDocument();
    fireEvent.keyDown(openButton, { key: "Enter", keyCode: 13 }); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("opens on space", async () => {
    const { getByRole } = render(<Main />);
    const openButton = getByRole("button");
    userEvent.tab();
    expect(openButton).toHaveFocus();
    fireEvent.keyDown(openButton, { key: " ", keyCode: 32 }); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "true");
    });
    const option = getByRole("menuitem", { name: "Label 1" });
    expect(option).toBeInTheDocument();
    const option2 = getByRole("menuitem", { name: "Label 2" });
    expect(option2).toBeInTheDocument();
    const option3 = getByRole("menuitem", { name: "Label 3" });
    expect(option3).toBeInTheDocument();
  });

  it("closes on space", async () => {
    const { getByRole } = render(<Main />);
    const openButton = getByRole("button");
    userEvent.tab();
    expect(openButton).toHaveFocus();
    fireEvent.keyDown(openButton, { key: " ", keyCode: 32 }); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "true");
    });
    const option = getByRole("menuitem", { name: "Label 1" });
    expect(option).toBeInTheDocument();
    const option2 = getByRole("menuitem", { name: "Label 2" });
    expect(option2).toBeInTheDocument();
    const option3 = getByRole("menuitem", { name: "Label 3" });
    expect(option3).toBeInTheDocument();
    fireEvent.keyDown(openButton, { key: " ", keyCode: 32 }); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("opens and closes mixing mouse click, Enter, and Space", async () => {
    const { getByRole } = render(<Main />);

    const openButton = getByRole("button");
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    userEvent.click(openButton); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "true");
    });

    fireEvent.keyDown(openButton, { key: "Enter", keyCode: 13 }); // close
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "false");
    });

    fireEvent.keyDown(openButton, { key: " ", keyCode: 32 }); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "true");
    });

    userEvent.click(openButton); // open
    await waitFor(() => {
      expect(openButton).toHaveAttribute("aria-expanded", "false");
    });
  });
});
