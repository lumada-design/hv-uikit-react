import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvList } from "~/components";

describe("List", () => {
  it("should be defined", () => {
    const { container } = render(<HvList values={[]} />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvList values={[]} />);
    expect(container).toMatchSnapshot();
  });
});
