import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvTypography, typographyVariants } from ".";

describe("Typography", () => {
  it("renders text children", () => {
    render(<HvTypography>TEXT</HvTypography>);
    expect(screen.getByText("TEXT")).toBeInTheDocument();
  });

  it("renders node children", () => {
    render(
      <HvTypography>
        <button type="button">TEXT</button>
      </HvTypography>
    );
    expect(screen.getByRole("button", { name: "TEXT" })).toBeInTheDocument();
  });

  it("renders with a custom component", () => {
    render(
      <HvTypography component="a" href="https://example.com">
        LINK
      </HvTypography>
    );
    const link = screen.getByRole("link", { name: "LINK" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  describe("variants", () => {
    typographyVariants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        render(<HvTypography variant={variant}>TEXT</HvTypography>);
        const text = screen.getByText("TEXT");
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass(`HvTypography-${variant}`);
      });
    });
  });
});
