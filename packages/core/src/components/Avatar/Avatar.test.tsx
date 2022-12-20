import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("should be defined", () => {
    const { container } = render(<Avatar />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Avatar />);
    expect(container).toMatchSnapshot();
  });

  describe("letter avatar", () => {
    it("should render the avatar as text", () => {
      const { container, getByText } = render(
        <Avatar badge="sema4">AB</Avatar>
      );

      expect(container).toMatchSnapshot();
      expect(getByText("AB")).toBeInTheDocument();
    });
  });
});
