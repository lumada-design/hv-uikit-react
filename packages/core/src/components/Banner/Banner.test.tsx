import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvBanner } from "./Banner";

describe("Banner", () => {
  it("should render the close button", () => {
    render(<HvBanner open variant="success" showIcon />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("it should render the actions", () => {
    render(
      <HvBanner
        open
        label="label"
        actions={[
          { id: "action1", label: "action1" },
          { id: "action2", label: "action2" },
        ]}
        actionsPosition="inline"
        onClose={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "action1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "action2" })).toBeInTheDocument();
  });
});
