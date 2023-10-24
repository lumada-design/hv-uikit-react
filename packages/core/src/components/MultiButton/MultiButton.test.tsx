import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LocationPin, Map } from "@hitachivantara/uikit-react-icons";

import { HvButton } from "@core/components";

import { HvMultiButton } from "./MultiButton";

describe("MultiButton", () => {
  it("should render the buttons", () => {
    render(
      <HvMultiButton>
        <HvButton key="1" startIcon={<Map />}>
          Button1
        </HvButton>
        <HvButton key="2" startIcon={<LocationPin />}>
          Button2
        </HvButton>
      </HvMultiButton>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
