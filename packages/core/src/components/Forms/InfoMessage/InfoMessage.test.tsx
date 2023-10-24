import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvInfoMessage } from "@core/components";

describe("InfoMessage", () => {
  it("should render the content", () => {
    render(<HvInfoMessage>CONTENT</HvInfoMessage>);
    expect(screen.getByText("CONTENT")).toBeInTheDocument();
  });
});
