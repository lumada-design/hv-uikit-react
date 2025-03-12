import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvAvatar } from "./Avatar";

describe("Avatar", () => {
  it("renders the text", () => {
    render(<HvAvatar>AB</HvAvatar>);

    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(
      <HvAvatar>
        <div data-testid="login" />
      </HvAvatar>,
    );

    expect(screen.getByTestId("login")).toBeInTheDocument();
  });
});
