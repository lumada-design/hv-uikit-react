import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { HvActionBar } from "./ActionBar";

describe("ActionBar", () => {
  it("should render correctly", () => {
    const { container } = render(<HvActionBar />);
    expect(container).toBeDefined();
  });
});
