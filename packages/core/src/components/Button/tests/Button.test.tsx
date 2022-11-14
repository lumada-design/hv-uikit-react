import { describe, expect, it } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("should match the snapshot", ({ render }) => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });
});
