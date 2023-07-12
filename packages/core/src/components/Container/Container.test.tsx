import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvContainer } from "./Container";
import { HvTypography } from "..";

describe("Container", () => {
  it("renders the content", () => {
    render(
      <HvContainer>
        <HvTypography variant="title1">CONTENT</HvTypography>
      </HvContainer>
    );
    expect(
      screen.getByRole("heading", { name: "CONTENT" })
    ).toBeInTheDocument();
  });
});
