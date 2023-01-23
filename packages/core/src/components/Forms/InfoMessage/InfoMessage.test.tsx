import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvInfoMessage } from "components";

describe("InfoMessage", () => {
  it("should be defined", () => {
    const { container } = render(<HvInfoMessage />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvInfoMessage />);
    expect(container).toMatchSnapshot();
  });
});
