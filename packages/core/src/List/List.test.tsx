import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvList } from ".";

describe("List", () => {
  it("should be defined", () => {
    const { container } = render(<HvList values={[]} />);
    expect(container).toBeDefined();
  });

  it("should render separators when showSeparators is true and items have separator property", () => {
    const values = [
      { id: 1, label: "Item 1", separator: true },
      { id: 2, label: "Item 2", separator: false },
      { id: 3, label: "Item 3", separator: true },
      { id: 4, label: "Item 4" },
    ];

    const { container } = render(<HvList values={values} />);

    // Should render separators after items with separator: true, except the last item
    const separators = container.querySelectorAll(".HvList-separator");
    expect(separators).toHaveLength(2); // After Item 1 and Item 3
  });
});
