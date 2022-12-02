import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "./";

describe("Link", () => {
  it("should render correctly", () => {
    const { container } = render(<Link>text</Link>);
    expect(container).toBeDefined();
  });
});
