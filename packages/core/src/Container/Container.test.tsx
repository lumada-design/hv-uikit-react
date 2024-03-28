import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvTypography } from "../Typography";
import { HvContainer } from "./Container";

describe("Container", () => {
  it("renders the content", () => {
    render(
      <HvContainer>
        <HvTypography variant="title1">CONTENT</HvTypography>
      </HvContainer>,
    );
    expect(
      screen.getByRole("heading", { name: "CONTENT" }),
    ).toBeInTheDocument();
  });
});
