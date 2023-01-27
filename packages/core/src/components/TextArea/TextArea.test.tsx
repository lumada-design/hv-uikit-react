import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { HvTextArea } from "./TextArea";

const Main = () => (
  <HvTextArea
    label="Label"
    placeholder="Enter value"
    rows={5}
    maxCharQuantity={10}
  />
);

describe("TextArea", () => {
  it("should be defined", () => {
    const { container } = render(<Main />);

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Main />);

    expect(container).toMatchSnapshot();
  });

  it("should render as expected", () => {
    const { getByRole } = render(<Main />);

    const textarea = getByRole("textbox", { name: "Label" });

    expect(textarea).toBeInTheDocument();

    expect(textarea).toBeEnabled();

    expect(textarea).toBeValid();

    expect(textarea).not.toBeRequired();

    expect(textarea).not.toHaveAttribute("readonly");
  });

  it("should be disabled", () => {
    const { getByRole } = render(
      <HvTextArea rows={4} label="Label" disabled />
    );

    const textarea = getByRole("textbox", { name: "Label" });

    expect(textarea).toBeInTheDocument();

    expect(textarea).toBeDisabled();
  });

  it("should be required and the label should have an asterisk", () => {
    const { getByRole, getByText } = render(
      <HvTextArea rows={4} label="Label" required />
    );

    const textarea = getByRole("textbox", { name: "Label" });

    expect(textarea).toBeInTheDocument();

    expect(textarea).toBeRequired();

    const label = getByText("Label", { selector: "label" });

    expect(label).toHaveTextContent("Label*");
  });

  it("should be readonly", () => {
    const { getByRole } = render(
      <HvTextArea rows={4} label="Label" readOnly />
    );

    const textarea = getByRole("textbox", { name: "Label" });

    expect(textarea).toBeInTheDocument();

    expect(textarea).toHaveAttribute("readonly");
  });

  it("should render the count label correctly", () => {
    const { getByText } = render(
      <HvTextArea
        rows={4}
        label="Label"
        defaultValue="Test"
        middleCountLabel="of"
        maxCharQuantity={10}
      />
    );

    const labelCount = getByText("4");

    expect(labelCount).toBeDefined();
  });

  it("should render the count label correctly and show the warning", () => {
    const { getByRole, getByText } = render(
      <HvTextArea
        rows={4}
        label="Label"
        placeholder="Enter value"
        middleCountLabel="of"
        maxCharQuantity={3}
        defaultValue="Tests"
      />
    );

    const textarea = getByRole("textbox", { name: "Label" });

    expect(textarea).toBeInTheDocument();

    expect(textarea).toBeInvalid();

    const labelCount = getByText("5");

    expect(labelCount).toBeDefined();
  });

  it("should use the ref passed by the caller", () => {
    const ref = createRef<HTMLElement>();

    expect(ref.current).toBe(null);

    render(
      <HvTextArea
        label="Label"
        placeholder="Enter value"
        rows={4}
        maxCharQuantity={10}
        inputRef={ref}
      />
    );

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
