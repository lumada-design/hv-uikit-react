import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvAvatar } from "./Avatar";

describe("Avatar", () => {
  it("should be defined", () => {
    const { container } = render(<HvAvatar />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvAvatar />);
    expect(container).toMatchSnapshot();
  });

  describe("letter avatar", () => {
    it("should render the avatar as text", () => {
      const { container, getByText } = render(
        <HvAvatar badge="sema4">AB</HvAvatar>
      );

      expect(container).toMatchSnapshot();
      expect(getByText("AB")).toBeInTheDocument();
    });
  });
});
