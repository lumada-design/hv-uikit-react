import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HvLogin } from ".";

describe("Login", () => {
  it("should be defined", () => {
    const { container } = render(<HvLogin>Login content</HvLogin>);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvLogin>Login content</HvLogin>);
    expect(container).toMatchSnapshot();
  });
});
