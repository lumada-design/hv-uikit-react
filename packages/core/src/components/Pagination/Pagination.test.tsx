import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvPagination } from "./Pagination";

describe("Pagination", () => {
  it("renders default page size and page", () => {
    render(<HvPagination />);
    expect(screen.getByRole("textbox")).toHaveTextContent("10");
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();

    const firstButton = screen.getByRole("button", { name: "First Page" });
    expect(firstButton).toBeDisabled();
    const prevButton = screen.getByRole("button", { name: "Previous Page" });
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByRole("button", { name: "Next Page" });
    expect(nextButton).toBeDisabled();
    const lastButton = screen.getByRole("button", { name: "Last Page" });
    expect(lastButton).toBeDisabled();
  });

  it("renders page size and page", () => {
    render(<HvPagination pageSize={42} page={12} pages={100} />);
    expect(screen.getByRole("textbox")).toHaveTextContent("42");
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("hides page size and page correctly", () => {
    render(<HvPagination showPageJump={false} showPageSizeOptions={false} />);
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("spinbutton")).toBeNull();
    expect(screen.queryByText("100")).toBeNull();
  });

  it("renders correctly on first page", () => {
    const changeMock = vi.fn();
    render(
      <HvPagination canNext page={0} pages={100} onPageChange={changeMock} />
    );

    const firstButton = screen.getByRole("button", { name: "First Page" });
    expect(firstButton).toBeDisabled();
    const prevButton = screen.getByRole("button", { name: "Previous Page" });
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByRole("button", { name: "Next Page" });
    expect(nextButton).toBeEnabled();
    const lastButton = screen.getByRole("button", { name: "Last Page" });
    expect(lastButton).toBeEnabled();

    fireEvent.click(firstButton);
    expect(changeMock).not.toHaveBeenCalled();
    fireEvent.click(prevButton);
    expect(changeMock).not.toHaveBeenCalled();

    fireEvent.click(nextButton);
    expect(changeMock).toHaveBeenCalledWith(1);
    fireEvent.click(lastButton);
    expect(changeMock).toHaveBeenCalledWith(99);
  });
});
