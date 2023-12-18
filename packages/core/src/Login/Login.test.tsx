import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { HvLogin } from ".";

describe("Login", () => {
  it("should render the content", () => {
    render(<HvLogin>Login content</HvLogin>);
    expect(screen.getByText("Login content")).toBeInTheDocument();
  });
});
