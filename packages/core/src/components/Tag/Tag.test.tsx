import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("should be defined", () => {
    const { container } = render(<Tag />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Tag />);
    expect(container).toMatchSnapshot();
  });
});
