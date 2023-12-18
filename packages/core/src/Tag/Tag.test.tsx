import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HvTag } from "./Tag";

describe("Tag", () => {
  it("renders the element with label", () => {
    render(<HvTag label="TAG_LABEL" />);

    const tag = screen.getByText("TAG_LABEL");
    expect(tag).toBeInTheDocument();
  });

  it("triggers onClick when clicking tag", async () => {
    const clickMock = vi.fn();
    render(<HvTag label="TAG" onClick={clickMock} />);

    const tag = screen.getByRole("button", { name: "TAG" });
    await userEvent.click(tag);
    expect(clickMock).toHaveBeenCalledOnce();
  });

  it("triggers onDelete when pressing delete key", async () => {
    const clickMock = vi.fn();
    const deleteMock = vi.fn();
    render(<HvTag label="TAG" onClick={clickMock} onDelete={deleteMock} />);

    const tag = screen.getByRole("button", { name: "TAG" });
    await userEvent.click(tag);
    expect(clickMock).toHaveBeenCalledOnce();
    await userEvent.type(tag, "{backspace}");
    expect(deleteMock).toHaveBeenCalledOnce();
  });
});
