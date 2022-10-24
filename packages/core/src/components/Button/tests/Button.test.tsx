import { describe, expect, it } from "vitest";
import { Button } from "../Button";

describe("IconComponent", () => {
  it("should match the snapshot for the given props", ({ render }) => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });
});
