import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvBaseInput } from "./BaseInput";

describe("BaseInput", () => {
  it("should be defined", () => {
    const { container } = render(<HvBaseInput />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvBaseInput />);
    expect(container).toMatchSnapshot();
  });

  it("should mark the input as disabled", () => {
    const { getByRole } = render(<HvBaseInput disabled />);
    expect(getByRole("textbox")).toHaveAttribute("disabled");
  });

  it("should mark the input as required", () => {
    const { getByRole } = render(<HvBaseInput required />);
    expect(getByRole("textbox")).toHaveAttribute("required");
  });

  it("should mark the input as read only", () => {
    const { getByRole } = render(<HvBaseInput readOnly />);
    expect(getByRole("textbox")).toHaveAttribute("readOnly");
  });

  it("should render a textarea in multiline mode", () => {
    const { getByRole } = render(<HvBaseInput multiline />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should call the onChange callback", () => {
    const mockFn = vi.fn();
    const { getByRole } = render(<HvBaseInput onChange={mockFn} />);
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "mockText" } });
    expect(mockFn).toHaveBeenCalled();
  });
});
