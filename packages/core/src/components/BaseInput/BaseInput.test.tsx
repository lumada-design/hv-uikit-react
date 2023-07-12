import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvBaseInput } from "./BaseInput";

describe("BaseInput", () => {
  it("should mark the input as disabled", () => {
    render(<HvBaseInput disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("should mark the input as required", () => {
    render(<HvBaseInput required />);
    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("should mark the input as read only", () => {
    render(<HvBaseInput readOnly />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readOnly");
  });

  it("should render a textarea in multiline mode", () => {
    render(<HvBaseInput multiline />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should call the onChange callback", () => {
    const mockFn = vi.fn();
    render(<HvBaseInput onChange={mockFn} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "mockText" } });
    expect(mockFn).toHaveBeenCalled();
  });
});
