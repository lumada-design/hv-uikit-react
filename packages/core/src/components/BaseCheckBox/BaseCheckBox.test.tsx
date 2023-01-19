import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HvBaseCheckBox } from "./BaseCheckBox";

describe("BaseCheckBox", () => {
  it("should be defined", () => {
    const { container } = render(<HvBaseCheckBox />);

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvBaseCheckBox />);

    expect(container).toMatchSnapshot();
  });

  describe("checked", () => {
    it("should render correctly", () => {
      const { container } = render(<HvBaseCheckBox checked />);

      expect(container).toMatchSnapshot();
    });

    it("should always be checked", async () => {
      const { getByRole } = render(<HvBaseCheckBox checked />);

      const baseCheckbox = getByRole("checkbox");

      expect(baseCheckbox).toBeInTheDocument();

      expect(baseCheckbox).toBeChecked();

      await userEvent.click(baseCheckbox);

      expect(baseCheckbox).toBeChecked();
    });

    it("should be checkable", async () => {
      const { getByRole } = render(<HvBaseCheckBox />);

      const baseCheckbox = getByRole("checkbox");

      expect(baseCheckbox).toBeInTheDocument();

      expect(baseCheckbox).not.toBeChecked();

      await userEvent.click(baseCheckbox);

      expect(baseCheckbox).toBeChecked();
    });

    it("should be checkable and checked by default", async () => {
      const { getByRole } = render(<HvBaseCheckBox defaultChecked />);

      const baseCheckbox = getByRole("checkbox");

      expect(baseCheckbox).toBeInTheDocument();

      expect(baseCheckbox).toBeChecked();

      await userEvent.click(baseCheckbox);

      expect(baseCheckbox).not.toBeChecked();
    });
  });

  describe("indeterminate", () => {
    it("should render correctly", () => {
      const { container } = render(<HvBaseCheckBox indeterminate />);

      expect(container).toMatchSnapshot();
    });

    it("should have attribute indeterminate", () => {
      const { getByRole } = render(<HvBaseCheckBox indeterminate />);

      const baseCheckbox = getByRole("checkbox");

      expect(baseCheckbox).toBeInTheDocument();

      expect(baseCheckbox).toHaveAttribute("data-indeterminate", "true");
    });
  });

  describe("read only", () => {
    it("should render correctly", () => {
      const { container } = render(<HvBaseCheckBox readOnly />);

      expect(container).toMatchSnapshot();
    });

    it("should have attribute readOnly", () => {
      const { getByRole } = render(<HvBaseCheckBox readOnly />);

      const baseCheckbox = getByRole("checkbox");

      expect(baseCheckbox).toBeInTheDocument();

      expect(baseCheckbox).toHaveAttribute("readOnly", "");
    });
  });

  describe("required", () => {
    it("should render correctly", () => {
      const { container } = render(<HvBaseCheckBox required />);

      expect(container).toMatchSnapshot();
    });

    it("should have attribute required", () => {
      const { getByRole } = render(<HvBaseCheckBox required />);

      const baseCheckbox = getByRole("checkbox");

      expect(baseCheckbox).toBeInTheDocument();

      expect(baseCheckbox).toHaveAttribute("required", "");
    });
  });

  describe("disabled", () => {
    it("should render correctly", () => {
      const { container } = render(<HvBaseCheckBox disabled />);

      expect(container).toMatchSnapshot();
    });

    it("should be disabled", () => {
      const { getByRole } = render(<HvBaseCheckBox disabled />);

      const baseCheckbox = getByRole("checkbox");

      expect(baseCheckbox).toBeInTheDocument();

      expect(baseCheckbox).toBeDisabled();
    });

    it("should not be checkable", async () => {
      const { getByRole } = render(<HvBaseCheckBox disabled />);

      const baseCheckbox = getByRole("checkbox");

      expect(baseCheckbox).toBeInTheDocument();

      expect(baseCheckbox).not.toBeChecked();

      await userEvent.click(baseCheckbox);

      expect(baseCheckbox).not.toBeChecked();
    });
  });
});
