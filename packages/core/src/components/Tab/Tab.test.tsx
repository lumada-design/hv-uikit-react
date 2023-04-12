import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvTab } from "~/components";

describe("Tab", () => {
  it("should render correctly", () => {
    const { container } = render(<HvTab label="Clickable tab" />);

    expect(container).toMatchSnapshot();
  });
});
