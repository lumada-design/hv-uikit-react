import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvCharCounter } from "~/components";

describe("CharCounter", () => {
  it("should be defined", () => {
    const { container } = render(<HvCharCounter maxCharQuantity={10} />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvCharCounter maxCharQuantity={10} />);
    expect(container).toMatchSnapshot();
  });
});
