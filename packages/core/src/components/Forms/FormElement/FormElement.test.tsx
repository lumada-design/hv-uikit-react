import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvFormElement } from "./FormElement";

describe("FormElement", () => {
  it("should be defined", () => {
    const { container } = render(<HvFormElement />);
    expect(container).toBeDefined();
  });
});
