import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { HvLink } from "./Link";

describe("Link", () => {
  it("should render correctly", () => {
    const { container } = render(<HvLink>text</HvLink>);
    expect(container).toBeDefined();
  });
});
