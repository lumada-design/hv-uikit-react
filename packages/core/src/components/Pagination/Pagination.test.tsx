import { render } from "@testing-library/react";
import { HvProvider } from "index";
import { describe, expect, it } from "vitest";
import { HvPagination } from "./Pagination";

describe("Pagination", () => {
  it("should be defined", () => {
    const { container } = render(
      <HvProvider>
        <HvPagination />
      </HvProvider>
    );
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(
      <HvProvider>
        <HvPagination />
      </HvProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
