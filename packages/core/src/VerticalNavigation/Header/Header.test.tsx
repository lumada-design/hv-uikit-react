import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Play, Stop } from "@hitachivantara/uikit-react-icons";

import { HvVerticalNavigationHeader } from ".";

const Sample = () => {
  return (
    <HvVerticalNavigationHeader
      title="Menu"
      openIcon={<Play />}
      closeIcon={<Stop />}
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
