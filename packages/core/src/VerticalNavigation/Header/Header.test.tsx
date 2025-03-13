import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvVerticalNavigationHeader } from ".";

const Sample = () => {
  return (
    <HvVerticalNavigationHeader
      title="Menu"
      openIcon={<div />}
      closeIcon={<div />}
      collapseButtonProps={{
        "aria-label": "collapseButton",
        "aria-expanded": true,
      }}
    />
  );
};

describe("VerticalNavigation - Header", () => {
  it("should be defined", () => {
    const { container } = render(<Sample />);
    expect(container).toBeDefined();
  });
});
