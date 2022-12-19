import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { ActionBar } from "./ActionBar";

describe("ActionBar", () => {
  it("should render correctly", () => {
    const { container } = render(<ActionBar />);
    expect(container).toBeDefined();
  });
});
