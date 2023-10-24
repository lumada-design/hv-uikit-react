import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvList } from "@core/components";

describe("List", () => {
  it("should be defined", () => {
    const { container } = render(<HvList values={[]} />);
    expect(container).toBeDefined();
  });
});
