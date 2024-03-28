import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvLogin } from ".";

describe("Login", () => {
  it("should render the content", () => {
    render(<HvLogin>Login content</HvLogin>);
    expect(screen.getByText("Login content")).toBeInTheDocument();
  });
});
