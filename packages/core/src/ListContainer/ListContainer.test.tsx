import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvListContainer } from "./ListContainer";
import { HvListItem } from "./ListItem";

describe("ListContainer", () => {
  it("should render all the items", () => {
    render(
      <HvListContainer>
        <HvListItem role="option">Item 1</HvListItem>
        <HvListItem role="option">Item 2</HvListItem>
        <HvListItem role="option">Item 3</HvListItem>
      </HvListContainer>,
    );
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });
});
